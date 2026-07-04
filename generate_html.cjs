const fs = require('node:fs');
const path = require('node:path');

const JOBS_PATH = path.join('data', 'jobs.json');
const ANALYSIS_PATH = path.join('data', 'analysis.json');
const OUTPUT_PATH = path.join('docs', 'index.html');

function readAnalysis() {
  if (!fs.existsSync(ANALYSIS_PATH)) return {};
  try {
    const raw = fs.readFileSync(ANALYSIS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

const SOURCE_LABELS = {
  saramin: '사람인',
  wanted: '원티드',
  jobkorea: '잡코리아',
};

const POSITIVE_KEYWORDS = [
  ['Next.js', 2.2, ['next.js', 'nextjs']],
  ['React', 2.0, ['react', '리액트']],
  ['TypeScript', 1.6, ['typescript', 'type script', 'ts']],
  ['JavaScript', 0.8, ['javascript', 'java script', 'js']],
  ['Frontend', 1.4, ['프론트엔드', 'frontend', 'front-end', '프론트']],
  ['Web Service', 1.0, ['웹개발', '웹 개발', '웹서비스', '서비스']],
  ['Storybook', 0.8, ['storybook']],
  ['SEO/Vercel', 0.7, ['seo', 'vercel']],
  ['Supabase', 0.7, ['supabase']],
  ['Docker', 0.7, ['docker']],
  ['Admin', 0.7, ['관리자', 'admin']],
  ['MVP/Startup', 0.8, ['mvp', '스타트업', 'startup', '에이전시', 'agency']],
  ['Domain Match', 0.8, ['예약', '대여', '상점', '커머스', '지도', '채팅', '소상공인', '로컬']],
  ['AI Workflow', 0.4, ['ai', '인공지능', '자동화', '생산성']],
];

const JUNIOR_KEYWORDS = ['신입', '주니어', '인턴', '채용전환형', '경력무관', '경력 무관', '1년', '1-3년', '1~3년', '1-4년', '1~4년'];
const CAUTION_KEYWORDS = [
  ['경력 3년 이상 확인 필요', ['경력 3년', '3년 이상', '경력3년']],
  ['시니어/리드 성격 가능성', ['시니어', '리드', '팀장', 'lead', 'senior']],
  ['5년 이상 경력 요구 가능성', ['5년 이상', '경력 5년', '경력5년']],
  ['프론트 비중이 낮은 백엔드 중심 공고 가능성', ['백엔드', '서버개발', 'server', 'backend']],
  ['단순 퍼블리싱 업무일 수 있음', ['퍼블리셔', '웹퍼블리셔', 'html/css']],
  ['React Native 단독 포지션 가능성', ['react native', '리액트 네이티브']],
  ['파견/SI 중심 여부 확인 필요', ['파견', 'si', '상주']],
  ['비개발 프론트 직무 가능성', ['프런트 모집', '프론트 모집', '고객응대', '리조트', '호텔']],
];

const PROJECT_RULES = [
  ['소상상점', ['next.js', 'nextjs', 'react', 'typescript', 'storybook', 'seo', 'vercel', 'oauth', 'api', 'github']],
  ['쌍청문 공간대여 예약 시스템', ['예약', '관리자', 'supabase', 'migration', '정책']],
  ['쌍청문 키오스크/대여 관리 시스템', ['키오스크', '대여', '물품', 'pwa', 'docker', 'sqlite', 'drizzle']],
  ['웹에이전시/MVP 홈페이지', ['랜딩', '홈페이지', '상담', '문의', 'mvp', '에이전시', '고객사', '스타트업']],
  ['AI memory workflow', ['ai', '문서화', '자동화', '생산성', 'workflow', 'knowledge']],
];

function readJobs() {
  if (!fs.existsSync(JOBS_PATH)) return [];
  const raw = fs.readFileSync(JOBS_PATH, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function normalizeText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function lowerCorpus(job) {
  return [job.title, job.company, job.location, job.experience, job.stack, job.salary, job.deadline]
    .map(normalizeText)
    .join(' ')
    .toLowerCase();
}

function escapeHtml(value) {
  return normalizeText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function safeUrl(url) {
  const value = normalizeText(url);
  if (!value) return '#';
  try {
    const parsed = new URL(value);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.toString();
  } catch (_) {
    return '#';
  }
  return '#';
}

function includesAny(text, needles) {
  return needles.some((needle) => text.includes(needle.toLowerCase()));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function formatDateTime(value) {
  if (!value) return '수집 시각 정보 없음';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return normalizeText(value);
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function getLastScrapedAt(jobs) {
  const dates = jobs
    .map((job) => new Date(job.scraped_at).getTime())
    .filter((time) => Number.isFinite(time));
  if (!dates.length) return '정보 없음';
  return formatDateTime(new Date(Math.max(...dates)).toISOString());
}

function analyzeJobFromLlm(job, llm) {
  // LLM 분석 결과를 keyword-rule 결과와 동일한 shape으로 매핑.
  const score = Math.max(1, Math.min(10, Math.round(Number(llm.fit_score) || 5)));
  const recommendation = String(llm.recommendation || '').trim() || (
    score >= 8 ? '강력 추천' : score >= 6 ? '추천' : score >= 4 ? '보류' : '비추천'
  );
  const tags = Array.isArray(llm.core_stack_tags) && llm.core_stack_tags.length
    ? llm.core_stack_tags
    : Array.isArray(llm.tags) ? llm.tags : [];
  const reason = String(llm.reason || llm.recommendation_reason || '').trim();
  const risk = String(llm.risk || llm.risks || '').trim() || '큰 위험 신호 없음';
  const projectToHighlight = String(llm.feature_project || llm.projectToHighlight || '').trim()
    || '소상상점 / 쌍청문 실사용 프로젝트 중 공고 상세 확인 후 선택';
  const learningPoint = String(llm.learning_points || llm.learningPoint || '').trim()
    || '도메인/제품 이해와 사용자 흐름 분석 준비';
  const motivation = String(llm.motivation || '').trim()
    || '웹 개발 경험을 기반으로 공고의 역할 범위를 빠르게 학습해 기여하고 싶습니다.';
  const summary = String(llm.summary || '').trim() || buildSummary(job, score, recommendation);
  const questionsToAsk = String(llm.questions_to_ask || '').trim();
  const portfolioLink = String(llm.portfolio_link_point || '').trim();

  return {
    ...job,
    analysis: {
      score,
      tags: unique(tags).slice(0, 8),
      recommendation,
      reason: reason || '공고 상세 확인 필요',
      risk,
      projectToHighlight,
      learningPoint,
      motivation,
      summary,
      questionsToAsk,
      portfolioLink,
      source: 'llm',
    },
  };
}

function analyzeJob(job, analysisMap) {
  if (analysisMap && analysisMap[job.id]) {
    return analyzeJobFromLlm(job, analysisMap[job.id]);
  }
  const corpus = lowerCorpus(job);
  const title = normalizeText(job.title);
  const experience = normalizeText(job.experience);

  let rawScore = 4.2;
  const tags = [];
  const fitReasons = [];
  const risks = [];

  for (const [label, weight, patterns] of POSITIVE_KEYWORDS) {
    if (includesAny(corpus, patterns)) {
      rawScore += weight;
      tags.push(label);
    }
  }

  if (includesAny(`${title} ${experience}`.toLowerCase(), JUNIOR_KEYWORDS)) {
    rawScore += 1.4;
    tags.push('Junior-Friendly');
    fitReasons.push('신입/주니어 또는 채용전환형으로 검토 가능');
  }

  if (tags.includes('React') || tags.includes('Next.js') || tags.includes('TypeScript')) {
    fitReasons.push('React/Next.js/TypeScript 중심 포지셔닝과 연결 가능');
  }
  if (tags.includes('Domain Match') || tags.includes('MVP/Startup') || tags.includes('Admin')) {
    fitReasons.push('실제 운영 문제를 웹 시스템으로 바꾼 프로젝트 경험을 앞세우기 좋음');
  }
  if (tags.includes('AI Workflow')) {
    fitReasons.push('AI 활용은 메인 헤드라인이 아니라 문서화/자동화 보조 강점으로 언급 가능');
  }

  for (const [label, patterns] of CAUTION_KEYWORDS) {
    if (includesAny(corpus, patterns)) {
      risks.push(label);
      rawScore -= label.includes('비개발') ? 3.2 : 1.2;
    }
  }

  if (corpus.includes('백엔드') && !corpus.includes('프론트엔드') && !corpus.includes('frontend')) {
    rawScore -= 1.8;
  }

  const score = Math.max(1, Math.min(10, Math.round(rawScore)));
  let recommendation = '비추천';
  if (score >= 8) recommendation = '강력 추천';
  else if (score >= 6) recommendation = '추천';
  else if (score >= 4) recommendation = '보류';

  const projectMatches = PROJECT_RULES
    .filter(([, patterns]) => includesAny(corpus, patterns))
    .map(([project]) => project);

  const projectToHighlight = unique(projectMatches).slice(0, 2).join(' / ') || '소상상점 / 쌍청문 실사용 프로젝트 중 공고 상세 확인 후 선택';
  const reason = fitReasons.length
    ? fitReasons.join(' · ')
    : '공고 원문에서 기술스택/역할 범위를 추가 확인해야 함';
  const risk = risks.length ? unique(risks).join(' · ') : '큰 위험 신호 없음';
  const learningPoint = buildLearningPoint(tags, risks);
  const motivation = buildMotivation(tags, projectToHighlight);

  return {
    ...job,
    analysis: {
      score,
      tags: unique(tags).slice(0, 8),
      recommendation,
      reason,
      risk,
      projectToHighlight,
      learningPoint,
      motivation,
      summary: buildSummary(job, score, recommendation),
    },
  };
}

function buildLearningPoint(tags, risks) {
  const points = [];
  if (!tags.includes('TypeScript')) points.push('TypeScript 요구 수준 확인');
  if (!tags.includes('Next.js')) points.push('Next.js 사용 여부 확인');
  if (risks.some((risk) => risk.includes('백엔드'))) points.push('백엔드 비중과 프론트엔드 업무 범위 질문 준비');
  if (risks.some((risk) => risk.includes('경력'))) points.push('주니어 지원 가능 여부와 온보딩 체계 확인');
  if (!points.length) points.push('도메인/제품 이해와 사용자 흐름 분석 준비');
  return unique(points).slice(0, 3).join(' · ');
}

function buildMotivation(tags, projectToHighlight) {
  if (tags.includes('MVP/Startup')) return 'MVP/초기 제품에서 사용자 흐름을 빠르게 구현한 경험을 바탕으로 기여하고 싶습니다.';
  if (tags.includes('Admin') || tags.includes('Domain Match')) return `${projectToHighlight} 경험처럼 실제 운영 문제를 웹 기능으로 바꾼 경험을 적용하고 싶습니다.`;
  if (tags.includes('React') || tags.includes('Next.js')) return 'React 기반 사용자 웹 구현 경험을 바탕으로 제품 품질과 개발 속도에 기여하고 싶습니다.';
  return '웹 개발 경험을 기반으로 공고의 역할 범위를 빠르게 학습해 기여하고 싶습니다.';
}

function buildSummary(job, score, recommendation) {
  const company = normalizeText(job.company) || '회사명 정보 없음';
  const title = normalizeText(job.title) || '공고명 정보 없음';
  return `${company} · ${title} · ${recommendation} ${score}/10`;
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item) || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function getTopSkills(jobs) {
  const counts = new Map();
  for (const job of jobs) {
    for (const tag of job.analysis.tags) {
      if (['Junior-Friendly', 'Domain Match', 'Web Service', 'Frontend'].includes(tag)) continue;
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
}

function statusClass(recommendation) {
  return {
    '강력 추천': 'status-strong',
    추천: 'status-good',
    보류: 'status-hold',
    비추천: 'status-no',
  }[recommendation] || 'status-hold';
}

function scoreClass(score) {
  if (score >= 8) return 'score-high';
  if (score >= 6) return 'score-mid';
  if (score >= 4) return 'score-low';
  return 'score-no';
}

function sourceLabel(source) {
  return SOURCE_LABELS[source] || source || '출처 정보 없음';
}

function renderKpi(label, value, hint) {
  return `
        <article class="kpi-card">
          <span class="kpi-label">${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${escapeHtml(hint)}</small>
        </article>`;
}

function renderSkillBar([skill, count], maxCount) {
  const width = maxCount ? Math.max(8, Math.round((count / maxCount) * 100)) : 0;
  return `
          <li class="skill-row">
            <span>${escapeHtml(skill)}</span>
            <div class="skill-track" aria-hidden="true"><i style="width:${width}%"></i></div>
            <b>${count}</b>
          </li>`;
}

function renderFilterOptions(values, labels = {}) {
  return values
    .map((value) => `<option value="${escapeAttr(value)}">${escapeHtml(labels[value] || value)}</option>`)
    .join('');
}

function renderJobCard(job) {
  const analysis = job.analysis;
  const searchText = [
    job.title,
    job.company,
    job.location,
    job.experience,
    job.stack,
    analysis.tags.join(' '),
    analysis.recommendation,
    analysis.reason,
    analysis.risk,
  ].join(' ').toLowerCase();
  const url = safeUrl(job.url);
  const tags = analysis.tags.length
    ? analysis.tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join('')
    : '<span class="chip muted">태그 없음</span>';

  return `
        <article class="job-card ${scoreClass(analysis.score)}"
          data-source="${escapeAttr(job.source)}"
          data-recommendation="${escapeAttr(analysis.recommendation)}"
          data-fit-score="${analysis.score}"
          data-search="${escapeAttr(searchText)}"
          data-company="${escapeAttr(job.company)}"
          data-deadline="${escapeAttr(job.deadline)}"
          data-first-seen="${escapeAttr(job.first_seen || job.scraped_at || '')}"
          data-scraped-at="${escapeAttr(job.scraped_at || '')}">
          <header class="card-head">
            <div>
              <span class="source-badge">${escapeHtml(sourceLabel(job.source))}</span>${job.is_new ? '<span class="new-badge">NEW</span>' : ''}
              <h2 title="${escapeAttr(job.title)}">${escapeHtml(job.title || '공고명 정보 없음')}</h2>
              <p class="company-line">${escapeHtml(job.company || '회사명 정보 없음')}</p>
            </div>
            <div class="score-badge ${statusClass(analysis.recommendation)}">
              <strong>${analysis.score}</strong><span>/10</span>
            </div>
          </header>

          <div class="meta-grid">
            <span>📍 ${escapeHtml(job.location || '지역 정보 없음')}</span>
            <span>🧭 ${escapeHtml(job.experience || '경력 정보 없음')}</span>
            <span>⏰ ${escapeHtml(job.deadline || '마감 정보 없음')}</span>
            <span>🕒 ${escapeHtml(formatDateTime(job.scraped_at))}</span>
          </div>

          <div class="recommend-line">
            <span class="recommend ${statusClass(analysis.recommendation)}">${escapeHtml(analysis.recommendation)}</span>
            <p>${escapeHtml(analysis.summary)}</p>
          </div>

          <div class="chips">${tags}</div>

          <dl class="analysis-list">
            <div><dt>추천 이유</dt><dd>${escapeHtml(analysis.reason)}</dd></div>
            <div><dt>위험 요소</dt><dd>${escapeHtml(analysis.risk)}</dd></div>
            <div><dt>앞세울 프로젝트</dt><dd>${escapeHtml(analysis.projectToHighlight)}</dd></div>
            <div><dt>보완 포인트</dt><dd>${escapeHtml(analysis.learningPoint)}</dd></div>
            <div><dt>지원동기 한 줄</dt><dd>${escapeHtml(analysis.motivation)}</dd></div>${analysis.questionsToAsk ? `
            <div><dt>확인할 질문</dt><dd>${escapeHtml(analysis.questionsToAsk)}</dd></div>` : ''}${analysis.portfolioLink ? `
            <div><dt>포트폴리오 연결</dt><dd>${escapeHtml(analysis.portfolioLink)}</dd></div>` : ''}
          </dl>

          <footer class="card-actions">
            <a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">원본 공고 보기</a>
          </footer>
        </article>`;
}

function buildHtml() {
  const allJobs = readJobs();
  const analysisMap = readAnalysis();
  // expired 공고는 대시보드에서 제외 (status 필드가 없는 레거시 데이터는 active로 간주)
  const activeJobs = allJobs.filter((j) => j.status !== 'expired');
  const analyzedJobs = activeJobs
    .map((job) => analyzeJob(job, analysisMap))
    .sort((a, b) => b.analysis.score - a.analysis.score);
  const newCount = analyzedJobs.filter((j) => j.is_new).length;
  const llmAnalyzed = analyzedJobs.filter((j) => j.analysis.source === 'llm').length;
  const total = analyzedJobs.length;
  const bySource = countBy(analyzedJobs, (job) => job.source);
  const byRecommendation = countBy(analyzedJobs, (job) => job.analysis.recommendation);
  const topSkills = getTopSkills(analyzedJobs);
  const maxSkillCount = topSkills[0]?.[1] || 0;
  const sources = ['all', ...Object.keys(bySource).sort()];
  const recommendations = ['all', '강력 추천', '추천', '보류', '비추천'];
  const generatedAt = formatDateTime(new Date().toISOString());
  const lastScrapedAt = formatDateTime(new Date().toISOString()); // Use current date for "오늘자"

  const cards = analyzedJobs.length
    ? analyzedJobs.map(renderJobCard).join('\n')
    : '';

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="data/jobs.json 기반 사용자 맞춤 프론트엔드 채용공고 대시보드">
  <title>Frontend Job Radar</title>
  <style>
    :root {
      --bg: #f7f8fb;
      --panel: #ffffff;
      --panel-soft: #f8fafc;
      --text: #1f2937;
      --muted: #64748b;
      --line: #e2e8f0;
      --point: #6366f1;
      --point-dark: #4f46e5;
      --good: #0f766e;
      --warn: #b45309;
      --danger: #b91c1c;
      --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: radial-gradient(circle at top left, #eef2ff 0, transparent 34rem), var(--bg); color: var(--text); }
    a { color: inherit; }
    .page { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 36px 0 56px; }
    .hero { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(280px, .8fr); gap: 24px; align-items: stretch; margin-bottom: 22px; }
    .hero-main, .insight-panel, .controls, .job-card, .empty-state { background: rgba(255,255,255,.92); border: 1px solid var(--line); border-radius: 28px; box-shadow: var(--shadow); }
    .hero-main { padding: 32px; position: relative; overflow: hidden; }
    .hero-main::after { content: ""; position: absolute; inset: auto -80px -120px auto; width: 260px; height: 260px; background: linear-gradient(135deg, rgba(99,102,241,.2), rgba(14,165,233,.16)); border-radius: 999px; }
    .eyebrow { color: var(--point); font-weight: 800; letter-spacing: .08em; font-size: .78rem; text-transform: uppercase; }
    h1 { margin: 10px 0 12px; font-size: clamp(2rem, 4vw, 4rem); line-height: 1.02; letter-spacing: -0.05em; }
    .hero-main p { max-width: 760px; color: var(--muted); font-size: 1.03rem; line-height: 1.7; }
    .hero-note { display: inline-flex; gap: 8px; align-items: center; margin-top: 16px; padding: 9px 13px; border-radius: 999px; background: #eef2ff; color: #3730a3; font-size: .86rem; font-weight: 700; }
    .insight-panel { padding: 22px; }
    .insight-panel h2 { margin: 0 0 14px; font-size: 1rem; }
    .skill-list { display: grid; gap: 10px; list-style: none; margin: 0; padding: 0; }
    .skill-row { display: grid; grid-template-columns: 96px 1fr 32px; gap: 10px; align-items: center; color: var(--muted); font-size: .86rem; }
    .skill-track { height: 8px; border-radius: 999px; background: #eef2ff; overflow: hidden; }
    .skill-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--point), #38bdf8); }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 22px; }
    .kpi-card { background: var(--panel); border: 1px solid var(--line); border-radius: 22px; padding: 18px; box-shadow: 0 12px 26px rgba(15, 23, 42, 0.06); }
    .kpi-label, .kpi-card small { display: block; color: var(--muted); font-size: .78rem; }
    .kpi-card strong { display: block; margin: 7px 0 3px; font-size: 1.75rem; letter-spacing: -0.04em; }
    .controls { padding: 18px; display: grid; grid-template-columns: 1.4fr repeat(3, minmax(150px, .5fr)); gap: 12px; align-items: end; margin-bottom: 22px; position: sticky; top: 10px; z-index: 5; backdrop-filter: blur(12px); }
    label { display: grid; gap: 6px; color: var(--muted); font-size: .78rem; font-weight: 800; }
    input, select { width: 100%; border: 1px solid var(--line); border-radius: 14px; background: #fff; color: var(--text); padding: 12px 13px; font: inherit; outline: none; }
    input:focus, select:focus { border-color: var(--point); box-shadow: 0 0 0 4px rgba(99,102,241,.14); }
    .result-line { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 12px; color: var(--muted); font-size: .9rem; }
    .jobs-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .job-card { padding: 22px; display: flex; flex-direction: column; min-height: 420px; transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease; }
    .job-card[hidden] { display: none !important; }
    .job-card:hover { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(15,23,42,.12); border-color: #c7d2fe; }
    .card-head { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; }
    .source-badge, .recommend, .chip { display: inline-flex; align-items: center; border-radius: 999px; font-weight: 800; }
    .source-badge { background: #eef2ff; color: #4338ca; padding: 5px 9px; font-size: .75rem; margin-bottom: 10px; }
    .new-badge { display: inline-flex; margin-left: 6px; padding: 4px 8px; border-radius: 999px; background: #ecfdf5; color: #047857; font-size: .7rem; font-weight: 900; letter-spacing: .04em; vertical-align: middle; }
    .card-head h2 { margin: 0; font-size: 1.22rem; line-height: 1.35; letter-spacing: -0.025em; }
    .company-line { margin: 6px 0 0; color: var(--muted); font-weight: 700; }
    .score-badge { flex: 0 0 auto; min-width: 68px; min-height: 68px; border-radius: 22px; display: grid; place-items: center; align-content: center; border: 1px solid currentColor; }
    .score-badge strong { font-size: 1.55rem; line-height: 1; }
    .score-badge span { font-size: .72rem; }
    .status-strong { color: #4338ca; background: #eef2ff; }
    .status-good { color: #0369a1; background: #e0f2fe; }
    .status-hold { color: var(--warn); background: #fff7ed; }
    .status-no { color: var(--danger); background: #fef2f2; }
    .score-high { border-top: 4px solid var(--point); }
    .score-mid { border-top: 4px solid #0ea5e9; }
    .score-low { border-top: 4px solid #f59e0b; }
    .score-no { border-top: 4px solid #ef4444; }
    .meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 18px 0; color: var(--muted); font-size: .86rem; }
    .meta-grid span { padding: 9px 10px; border-radius: 12px; background: var(--panel-soft); }
    .recommend-line { border-left: 4px solid #c7d2fe; padding: 2px 0 2px 12px; margin-bottom: 14px; }
    .recommend { padding: 4px 9px; font-size: .75rem; margin-bottom: 7px; }
    .recommend-line p { margin: 0; color: var(--muted); line-height: 1.55; }
    .chips { display: flex; flex-wrap: wrap; gap: 7px; margin: 0 0 15px; }
    .chip { background: #f1f5f9; color: #475569; padding: 6px 9px; font-size: .76rem; }
    .chip.muted { color: #94a3b8; }
    .analysis-list { display: grid; gap: 10px; margin: 0; }
    .analysis-list div { display: grid; gap: 3px; }
    .analysis-list dt { color: #334155; font-size: .77rem; font-weight: 900; }
    .analysis-list dd { margin: 0; color: var(--muted); font-size: .9rem; line-height: 1.55; }
    .card-actions { margin-top: auto; padding-top: 18px; }
    .card-actions a { display: block; text-align: center; text-decoration: none; background: var(--point); color: white; border-radius: 14px; padding: 12px 14px; font-weight: 900; transition: background .16s ease, transform .16s ease; }
    .card-actions a:hover { background: var(--point-dark); transform: translateY(-1px); }
    .pagination { display: flex; align-items: center; justify-content: center; gap: 14px; margin: 28px 0 12px; flex-wrap: wrap; }
    .page-btn { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 9px 18px; font-weight: 700; color: var(--text); cursor: pointer; transition: background .12s ease, border-color .12s ease; }
    .page-btn:hover:not(:disabled) { background: var(--panel-soft); border-color: var(--point); color: var(--point); }
    .page-btn:disabled { opacity: .4; cursor: not-allowed; }
    .page-info { color: var(--muted); font-weight: 800; font-size: .92rem; min-width: 64px; text-align: center; }
    .page-size-label { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: .78rem; font-weight: 800; }
    .page-size-label select { width: auto; padding: 8px 10px; border: 1px solid var(--line); border-radius: 10px; background: #fff; color: var(--text); font: inherit; }
    .empty-state { padding: 42px; text-align: center; color: var(--muted); }
    .empty-state strong { display: block; color: var(--text); font-size: 1.15rem; margin-bottom: 8px; }
    .footer { color: var(--muted); font-size: .82rem; margin-top: 26px; text-align: center; }
    @media (max-width: 920px) { .hero, .kpi-grid, .jobs-grid { grid-template-columns: 1fr; } .controls { grid-template-columns: 1fr 1fr; position: static; } }
    @media (max-width: 560px) { .page { width: min(100% - 20px, 1180px); padding-top: 18px; } .hero-main, .insight-panel, .controls, .job-card { border-radius: 20px; } .hero-main { padding: 24px; } .controls { grid-template-columns: 1fr; } .meta-grid { grid-template-columns: 1fr; } .card-head { flex-direction: column; } .score-badge { min-width: 100%; min-height: 54px; grid-template-columns: auto auto; gap: 2px; } }
  </style>
</head>
<body>
  <main class="page">
    <section class="hero" aria-labelledby="pageTitle">
      <div class="hero-main">
        <span class="eyebrow">Generated from data/jobs.json</span>
        <h1 id="pageTitle">Frontend Job Radar</h1>
        <p>사람인·원티드·잡코리아 공고를 사용자의 Next.js/React 중심 포지셔닝, 실사용 프로젝트 경험, MVP/웹에이전시 감각에 맞춰 지원 우선순위 관점으로 재정렬한 정적 대시보드입니다.</p>
        <span class="hero-note">점수는 합격 가능성이 아니라 검토 우선순위입니다</span>
      </div>
      <aside class="insight-panel" aria-labelledby="skillsTitle">
        <h2 id="skillsTitle">Top Skills</h2>
        <ul class="skill-list">
          ${topSkills.length ? topSkills.map((skill) => renderSkillBar(skill, maxSkillCount)).join('') : '<li class="skill-row"><span>데이터 없음</span><div class="skill-track"><i style="width:0"></i></div><b>0</b></li>'}
        </ul>
      </aside>
    </section>

    <section class="kpi-grid" aria-label="공고 요약">
      ${renderKpi('전체 active', String(total), `오늘 신규 ${newCount}건`)}
      ${renderKpi('강력 추천', String(byRecommendation['강력 추천'] || 0), '우선 검토 후보')}
      ${renderKpi('보류/비추천', String((byRecommendation['보류'] || 0) + (byRecommendation['비추천'] || 0)), '조건 확인 필요')}
      ${renderKpi('마지막 수집', lastScrapedAt, `LLM 분석 ${llmAnalyzed}/${total}`)}
    </section>

    <section class="controls" aria-label="검색과 필터">
      <label>통합 검색
        <input id="searchInput" type="search" placeholder="회사, 직무, 기술스택, 추천 이유 검색" autocomplete="off">
      </label>
      <label>출처
        <select id="sourceFilter">${renderFilterOptions(sources, { all: '전체 출처', ...SOURCE_LABELS })}</select>
      </label>
      <label>추천 단계
        <select id="recommendationFilter">${renderFilterOptions(recommendations, { all: '전체 추천 단계' })}</select>
      </label>
      <label>정렬
        <select id="sortSelect">
          <option value="score-desc">적합도 높은순</option>
          <option value="score-asc">적합도 낮은순</option>
          <option value="first-seen-desc">최신 등록순</option>
          <option value="first-seen-asc">오래된 등록순</option>
          <option value="scraped-desc">최근 수집순</option>
          <option value="company-asc">회사명순</option>
          <option value="deadline-asc">마감일 텍스트순</option>
        </select>
      </label>
      <div class="result-line">
        <span id="resultCount">총 ${total}개 중 ${total}개 표시 중</span>
        <span>사람인 ${bySource.saramin || 0} · 원티드 ${bySource.wanted || 0} · 잡코리아 ${bySource.jobkorea || 0}</span>
      </div>
    </section>

    <section id="jobsContainer" class="jobs-grid" aria-label="채용공고 목록">
${cards}
    </section>

    <nav id="pagination" class="pagination" aria-label="페이지">
      <button type="button" id="prevPage" class="page-btn">‹ 이전</button>
      <span id="pageInfo" class="page-info">1 / 1</span>
      <button type="button" id="nextPage" class="page-btn">다음 ›</button>
      <label class="page-size-label">페이지 크기
        <select id="pageSize">
          <option value="20" selected>20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="9999">전체</option>
        </select>
      </label>
    </nav>

    <section id="emptyState" class="empty-state" hidden>
      <strong>조건에 맞는 공고가 없습니다.</strong>
      <span>검색어를 줄이거나 필터를 전체로 바꿔보세요. data/jobs.json이 비어 있다면 scraper 실행 상태를 확인하세요.</span>
    </section>

    <p class="footer">Generated at ${escapeHtml(generatedAt)} · 민감정보/비공개 고객사 상세는 출력하지 않는 것을 원칙으로 합니다.</p>
  </main>

  <script>
    (function () {
      const searchInput = document.getElementById('searchInput');
      const sourceFilter = document.getElementById('sourceFilter');
      const recommendationFilter = document.getElementById('recommendationFilter');
      const sortSelect = document.getElementById('sortSelect');
      const resultCount = document.getElementById('resultCount');
      const container = document.getElementById('jobsContainer');
      const emptyState = document.getElementById('emptyState');
      const pagination = document.getElementById('pagination');
      const prevBtn = document.getElementById('prevPage');
      const nextBtn = document.getElementById('nextPage');
      const pageInfo = document.getElementById('pageInfo');
      const pageSizeSelect = document.getElementById('pageSize');
      const cards = Array.from(document.querySelectorAll('.job-card'));
      let currentPage = 1;

      function matches(card) {
        const query = searchInput.value.trim().toLowerCase();
        const source = sourceFilter.value;
        const recommendation = recommendationFilter.value;
        const haystack = (card.dataset.search || '').toLowerCase();
        return (!query || haystack.includes(query))
          && (source === 'all' || card.dataset.source === source)
          && (recommendation === 'all' || card.dataset.recommendation === recommendation);
      }

      function ts(value) {
        const t = Date.parse(value || '');
        return Number.isFinite(t) ? t : 0;
      }
      function compareCards(a, b) {
        const sort = sortSelect.value;
        if (sort === 'score-asc') return Number(a.dataset.fitScore) - Number(b.dataset.fitScore);
        if (sort === 'first-seen-desc') return ts(b.dataset.firstSeen) - ts(a.dataset.firstSeen);
        if (sort === 'first-seen-asc') return ts(a.dataset.firstSeen) - ts(b.dataset.firstSeen);
        if (sort === 'scraped-desc') return ts(b.dataset.scrapedAt) - ts(a.dataset.scrapedAt);
        if (sort === 'company-asc') return a.dataset.company.localeCompare(b.dataset.company, 'ko');
        if (sort === 'deadline-asc') return a.dataset.deadline.localeCompare(b.dataset.deadline, 'ko');
        return Number(b.dataset.fitScore) - Number(a.dataset.fitScore);
      }

      function getPageSize() {
        return Math.max(1, Number(pageSizeSelect.value) || 20);
      }

      function render() {
        const filtered = cards.filter(matches).sort(compareCards);
        const pageSize = getPageSize();
        const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const start = (currentPage - 1) * pageSize;
        const pageItems = filtered.slice(start, start + pageSize);

        for (const card of cards) {
          card.hidden = true;
          card.style.display = 'none';
        }
        for (const card of pageItems) {
          card.hidden = false;
          card.style.display = '';
          container.appendChild(card);
        }

        const showing = pageItems.length;
        const rangeStart = filtered.length ? start + 1 : 0;
        const rangeEnd = start + showing;
        resultCount.textContent =
          '총 ' + cards.length + '개 중 ' + filtered.length + '개 매칭, ' +
          rangeStart + '-' + rangeEnd + ' 표시';

        pageInfo.textContent = currentPage + ' / ' + totalPages;
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages;
        pagination.hidden = filtered.length === 0;
        emptyState.hidden = filtered.length > 0;
      }

      function applyFilters() {
        currentPage = 1;
        render();
      }

      for (const element of [searchInput, sourceFilter, recommendationFilter, sortSelect]) {
        element.addEventListener('input', applyFilters);
        element.addEventListener('change', applyFilters);
      }
      pageSizeSelect.addEventListener('change', applyFilters);
      prevBtn.addEventListener('click', () => { currentPage -= 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      nextBtn.addEventListener('click', () => { currentPage += 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      render();
    })();
  </script>
</body>
</html>
`;

  return html.replace(/[ \t]+$/gm, '');
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, buildHtml(), 'utf8');
console.log(`Successfully generated ${OUTPUT_PATH}`);
