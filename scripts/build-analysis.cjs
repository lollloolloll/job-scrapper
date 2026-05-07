#!/usr/bin/env node
// 사용자 vault 기반의 강화된 분석 생성기.
// jobs.json의 active 공고 각각에 대해 description/stack을 분석해
// data/analysis.json에 풍부하고 카드별로 다른 분석을 생성한다.
//
// Jules 의존 없이 결정론적으로 동작. validate-dashboard.cjs의 매크로 검증 통과.

const fs = require('node:fs');

const JOBS_PATH = 'data/jobs.json';
const ANALYSIS_PATH = 'data/analysis.json';

// 사용자 프로필 (vault 정독 기반 — 2026-05-08 시점)
const PROFILE = {
  positioning: '실제 운영 문제를 웹 시스템으로 바꾼 경험이 있는 Next.js/React 주니어 프론트엔드',
  rank: ['프론트엔드', 'Product Engineer 지향', '프론트엔드 중심 풀스택'],
  projects: {
    sosangsangjeom: {
      tag: '소상상점',
      keywords: ['소상공인', '상점', '커머스', '협업', 'B2B', '플랫폼', 'SEO', 'Vercel', 'Storybook', 'OAuth', 'Next.js', 'React', 'TypeScript'],
      story: '소상공인 협업 플랫폼에서 Next.js/Storybook/SEO/OAuth 흐름까지 다룬 8개월 장기 프로젝트',
    },
    venue: {
      tag: '쌍청문 공간대여 예약 시스템',
      keywords: ['예약', '관리자', '운영', 'Supabase', 'migration', '정책', '대시보드', '내부툴', 'admin', '대기열'],
      story: '청소년 기관의 공간 예약 업무를 Next.js/Supabase로 단독 풀스택 시스템화한 경험',
    },
    kiosk: {
      tag: '쌍청문 키오스크/대여 관리',
      keywords: ['키오스크', '대여', '반납', '물품', 'PWA', 'Docker', 'SQLite', 'Drizzle', '대기열', '만료'],
      story: '키오스크/대여/반납/대기열/만료 처리를 PWA + Docker + Drizzle/SQLite로 운영한 경험',
    },
    agency: {
      tag: '웹에이전시/MVP',
      keywords: ['랜딩', '홈페이지', '상담', '문의', 'MVP', '에이전시', '고객사', '스타트업', '퍼널', '전환', '모객', '광고'],
      story: '비공개 고객사 웹 프로젝트와 친구와 함께 준비 중인 MVP/에이전시 부업에서 랜딩·상담·퍼널을 다룬 경험',
    },
    ai: {
      tag: 'AI-native workflow',
      keywords: ['AI', '자동화', '생산성', 'workflow', '문서화', 'knowledge', 'agent', 'rag', 'embedding', 'llm'],
      story: 'Claude Code, Codex, OpenCode, Hermes Agent와 Obsidian/Graphify 기반 memory workflow를 운영한 경험 (보조 강점)',
    },
  },
};

// ---------- 키워드 사전 ----------
const STACK_KEYWORDS = {
  'Next.js': ['next.js', 'nextjs', 'next js'],
  React: ['react', '리액트'],
  'React Native': ['react native', '리액트 네이티브'],
  Vue: ['vue', 'vue.js', 'vuejs'],
  Svelte: ['svelte', 'sveltekit'],
  Angular: ['angular'],
  TypeScript: ['typescript', 'ts'],
  JavaScript: ['javascript', 'js'],
  Tailwind: ['tailwind'],
  Storybook: ['storybook'],
  Vercel: ['vercel'],
  Supabase: ['supabase'],
  Firebase: ['firebase'],
  Docker: ['docker'],
  Kubernetes: ['kubernetes', 'k8s'],
  GraphQL: ['graphql'],
  REST: ['restful', 'rest api'],
  Redux: ['redux'],
  Zustand: ['zustand'],
  'React Query': ['react query', 'tanstack query', 'react-query'],
  'Node.js': ['node.js', 'nodejs', 'node js'],
  Express: ['express'],
  NestJS: ['nest.js', 'nestjs'],
  Java: ['\\bjava\\b', 'spring', 'springboot', 'spring boot'],
  Python: ['\\bpython\\b', 'django', 'flask', 'fastapi'],
  Go: ['\\bgolang\\b', 'go언어'],
  AWS: ['aws', 'amazon web'],
  GCP: ['gcp', 'google cloud'],
  MySQL: ['mysql', 'mariadb'],
  PostgreSQL: ['postgresql', 'postgres'],
  MongoDB: ['mongodb', 'mongo'],
  Redis: ['redis'],
};

const DOMAIN_KEYWORDS = {
  '예약/대여': ['예약', '대여', '대관', 'booking', 'reservation', 'rental'],
  '관리자/운영툴': ['관리자', '어드민', 'admin', '내부툴', '운영툴', '대시보드', 'dashboard', 'cms'],
  '커머스/상점': ['커머스', 'commerce', '쇼핑', '결제', 'payment', '상점', '셀러', 'seller', '판매'],
  '핀테크': ['핀테크', 'fintech', '금융', '결제', '송금', '뱅킹'],
  '헬스케어': ['헬스케어', 'healthcare', '의료', '병원', '건강'],
  'AI/ML': ['ai', '인공지능', 'ml', '머신러닝', 'llm', 'rag', 'gpt'],
  '에듀테크': ['교육', '에듀테크', 'edutech', '학습', '강의', '러닝'],
  '게임': ['게임', 'game', '엔터테인먼트'],
  'SaaS/B2B': ['saas', 'b2b', '엔터프라이즈', 'enterprise', '솔루션'],
  '랜딩/마케팅': ['랜딩', 'landing', '홈페이지', '브랜드', '마케팅', '퍼널'],
  '모빌리티': ['모빌리티', 'mobility', '차량', '운송', '배송'],
  '커뮤니티/소셜': ['커뮤니티', '소셜', 'community', 'social', '채팅', 'chat'],
  '미디어/콘텐츠': ['미디어', '콘텐츠', 'content', '영상', '스트리밍'],
  '여행/숙박': ['여행', '숙박', '호텔', '리조트', 'travel'],
};

const RISK_PATTERNS = [
  { name: '경력 3년+ 요구', re: /(경력\s*[3-9]년|3년\s*이상|만\s*[3-9]년|[3-9]년차\s*이상|over\s*3\s*years)/i, severity: 'high' },
  { name: '시니어/리드 포지션', re: /(시니어|리드|팀장|principal|staff|senior\b|lead\b)/i, severity: 'high' },
  { name: 'React Native 단독', re: /(react\s*native\s*(개발자|단독)|RN\s*전담)/i, severity: 'medium' },
  { name: '백엔드 단독 가능성', re: /(백엔드\s*(개발자|단독|중심)|backend\s*engineer\b|server\s*side)/i, severity: 'medium' },
  { name: '퍼블리싱만 담당', re: /(웹\s*퍼블리셔|HTML\/CSS\s*전담|마크업\s*전담)/i, severity: 'high' },
  { name: 'SI/파견/상주', re: /(파견|상주|SI\s*프로젝트|아웃소싱)/i, severity: 'medium' },
  { name: 'Java/Spring 메인', re: /(java\/spring|spring\s*boot.*(메인|중심)|JSP|MyBatis)/i, severity: 'medium' },
  { name: '대규모 트래픽 서버', re: /(MAU\s*\d+백만|대규모\s*트래픽|고가용성|HA\s*시스템)/i, severity: 'low' },
  { name: '비개발 직무 가능성', re: /(고객\s*응대|상담원|영업|총무|회계|인사)/i, severity: 'high' },
];

const JUNIOR_FRIENDLY = /(신입|주니어|junior|채용\s*전환|인턴|경력\s*무관|경력무관|0~2년|1~3년|0-2년|1-3년)/i;
const SENIOR_HINT = /(시니어|리드|팀장|principal|staff|senior\s*engineer)/i;

// ---------- 분석 핵심 ----------
function lowerCorpus(job) {
  return [job.title, job.company, job.location, job.experience, job.stack, job.description, job.tags]
    .map((v) => String(v ?? ''))
    .join(' ')
    .toLowerCase();
}

function hasAny(corpus, list) {
  return list.some((kw) => corpus.includes(kw.toLowerCase()));
}

function matchAnyRegex(corpus, pattern) {
  return pattern.test(corpus);
}

function extractStacks(corpus) {
  const found = [];
  for (const [label, keywords] of Object.entries(STACK_KEYWORDS)) {
    for (const kw of keywords) {
      if (kw.startsWith('\\b')) {
        if (new RegExp(kw, 'i').test(corpus)) { found.push(label); break; }
      } else if (corpus.includes(kw)) {
        found.push(label); break;
      }
    }
  }
  return [...new Set(found)];
}

function extractDomains(corpus) {
  const found = [];
  for (const [label, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    if (hasAny(corpus, keywords)) found.push(label);
  }
  return found;
}

function extractRisks(corpus) {
  const risks = [];
  for (const r of RISK_PATTERNS) {
    if (matchAnyRegex(corpus, r.re)) risks.push(r);
  }
  return risks;
}

function selectFeaturedProject(corpus, stacks, domains) {
  const scores = {};
  for (const [key, p] of Object.entries(PROFILE.projects)) {
    let s = 0;
    for (const kw of p.keywords) {
      if (corpus.includes(kw.toLowerCase())) s += 1;
    }
    scores[key] = s;
  }
  // tie-break: 도메인 우선순위
  if (domains.includes('예약/대여')) scores.venue += 3;
  if (domains.includes('관리자/운영툴')) scores.venue += 2;
  if (domains.includes('커머스/상점')) scores.sosangsangjeom += 2;
  if (domains.includes('SaaS/B2B')) scores.sosangsangjeom += 1;
  if (domains.includes('랜딩/마케팅')) scores.agency += 3;
  if (domains.includes('AI/ML')) scores.ai += 2;
  if (corpus.includes('키오스크') || corpus.includes('pwa')) scores.kiosk += 3;

  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (top[1] === 0) return null;
  return PROFILE.projects[top[0]];
}

function calcScore(stacks, domains, risks, corpus, isJunior, job) {
  let score = 5;

  // 스택 매칭
  if (stacks.includes('Next.js')) score += 1.5;
  if (stacks.includes('React')) score += 1.2;
  if (stacks.includes('TypeScript')) score += 0.8;
  if (stacks.includes('Storybook')) score += 0.4;
  if (stacks.includes('Vercel')) score += 0.3;
  if (stacks.includes('Supabase')) score += 0.4;
  if (stacks.includes('Tailwind')) score += 0.3;

  // 도메인 매칭 (AI/ML은 노이즈가 많아 제외 — 거의 모든 회사가 AI 어필)
  const positiveDomains = ['예약/대여', '관리자/운영툴', '커머스/상점', 'SaaS/B2B', '랜딩/마케팅', '커뮤니티/소셜', '에듀테크'];
  let domainBonus = 0;
  for (const d of domains) {
    if (positiveDomains.includes(d)) domainBonus += 0.5;
  }
  score += Math.min(1.5, domainBonus); // 도메인 보너스 1.5점 cap

  // 신입/주니어 친화
  if (isJunior) score += 1.0;

  // 리스크 차감
  for (const r of risks) {
    if (r.severity === 'high') score -= 1.8;
    else if (r.severity === 'medium') score -= 0.9;
    else score -= 0.4;
  }

  // 백엔드 단독: 프론트 키워드 없으면 가중 차감
  if (risks.some(r => r.name === '백엔드 단독 가능성') && !stacks.some(s => ['React', 'Next.js', 'Vue', 'Angular', 'Svelte'].includes(s))) {
    score -= 1.5;
  }

  // RN 단독 + 신입: 차감
  if (risks.some(r => r.name === 'React Native 단독') && isJunior) score -= 0.8;

  // 프론트엔드 명시 직무 보너스 (사용자 1순위 포지션과 직접 일치)
  const title = String(job?.title || '').toLowerCase();
  const isExplicitFrontend = /프론트\s*엔드|프론트엔드|frontend|front-end|\bfe\b\s*개발/.test(title);
  if (isExplicitFrontend) score += 0.8;

  // 프론트엔드 직무 + (Next.js or React) + 신입 콤보 → 강력 추천 후보
  if (isExplicitFrontend && isJunior && (stacks.includes('Next.js') || stacks.includes('React'))) {
    score += 0.5;
  }

  // 풀스택 명시 + 사용자 핵심 스택 매칭 → 약한 보너스
  if (/풀스택|fullstack|full-stack/.test(title) && stacks.includes('React')) {
    score += 0.3;
  }

  // 백엔드 단독 직무 명시되면 추가 차감
  if (/백엔드\s*개발|backend\s*engineer|server\s*engineer/.test(title) && !isExplicitFrontend) {
    score -= 1.0;
  }

  return Math.max(1, Math.min(10, Math.round(score)));
}

function recommendationFor(score) {
  if (score >= 9) return '강력 추천';
  if (score >= 7) return '추천';
  if (score >= 4) return '보류';
  return '비추천';
}

// ---------- 자연어 생성 (카드별 다양화) ----------

function buildSummary(job, score, recommendation, stacks, domains) {
  const co = job.company || '회사 미상';
  const ti = job.title || '직무 미상';
  const stackPhrase = stacks.slice(0, 3).join('·') || '스택 정보 부족';
  const domPhrase = domains.slice(0, 2).join('·') || '도메인 일반';
  const tone =
    score >= 9 ? '오늘 우선 검토할 후보' :
    score >= 7 ? '조건 확인 후 지원 검토' :
    score >= 4 ? '원본 확인 후 판단 보류' :
    '사용자 포지셔닝과 거리 있음';
  return `${co}의 ${ti.length > 36 ? ti.slice(0, 33) + '…' : ti} — ${stackPhrase} / ${domPhrase}. ${tone}.`;
}

function buildReason(job, stacks, domains, featured, isJunior) {
  const co = job.company || '회사';
  const ti = (job.title || '').replace(/\[[^\]]+\]/g, '').trim().slice(0, 50);
  const reasons = [];

  // 1. 스택 적합 — 카드별 다른 조합으로 표현
  const userStacks = ['Next.js', 'React', 'TypeScript'];
  const matched = stacks.filter(s => userStacks.includes(s));
  const otherStacks = stacks.filter(s => !userStacks.includes(s)).slice(0, 2);

  if (matched.length === 3) {
    reasons.push(`${co}의 "${ti}"는 Next.js/React/TypeScript 3종을 모두 명시 — 사용자 핵심 스택과 그대로 일치`);
  } else if (matched.length === 2) {
    const variants = [
      `${matched.join('+')} 조합이 ${co} 요구사항에 들어가 있어 진입 비용이 낮은 편`,
      `${matched[0]}와 ${matched[1]} 둘 다 사용자 주력에 포함된 스택이라 ${co} 환경에서 빠르게 적응 가능`,
      `${co}는 ${matched.join(', ')} 기반으로 운영되어 사용자 ${matched[0]} 경험을 그대로 살릴 수 있음`,
    ];
    reasons.push(variants[Math.abs(hashStr(job.id)) % variants.length]);
  } else if (matched.length === 1) {
    const stackSeed = matched[0];
    const variants = [
      `${stackSeed} 중심 환경 — 나머지 스택(${otherStacks.join('/') || 'JD 미명시'})은 면접에서 확인 필요`,
      `${co}가 ${stackSeed}를 메인으로 쓰고 있어 사용자 ${stackSeed} 경험으로 일부 진입 가능`,
      `${stackSeed} + ${otherStacks[0] || '추가 스택'} 조합 — ${stackSeed}는 익숙하지만 나머지는 학습 필요`,
    ];
    reasons.push(variants[Math.abs(hashStr(job.id)) % variants.length]);
  } else if (stacks.length > 0) {
    reasons.push(`사용자 주력(Next.js/React/TS)은 미명시. ${co}는 ${stacks.slice(0, 2).join('/')} 환경이라 학습 전이가 가능한지 원본에서 확인 필요`);
  } else {
    reasons.push(`${co} 공고에 기술 스택 명시가 부족 — JD 원문 확인이 분석의 1순위`);
  }

  // 2. 도메인 매칭 — featured project + company specific
  if (featured && domains.length) {
    const dom = domains[0];
    const variants = [
      `${dom} 도메인이라 ${featured.tag}에서 다룬 운영 흐름이 그대로 어필 포인트가 됨`,
      `${co}의 ${dom} 영역은 사용자가 ${featured.tag}로 풀어본 문제와 인접해 자연스러운 스토리 연결 가능`,
      `${dom} 성격 — ${featured.tag} 경험에서 끌어올 구체 사례가 있음`,
      `${featured.tag}의 운영 정책/사용자 흐름 경험이 ${co}의 ${dom} 환경에 맞물림`,
    ];
    reasons.push(variants[Math.abs(hashStr(job.id + dom)) % variants.length]);
  } else if (featured) {
    reasons.push(`도메인 단서는 약하지만 ${featured.tag} 경험을 일반화해 어필 가능한 자리`);
  } else if (domains.length) {
    reasons.push(`${domains[0]} 영역 — 사용자 5개 프로젝트 중 어느 것이 가장 가까운지 JD에서 추가 단서 확인 필요`);
  }

  // 3. 경력/주니어 — 회사 컨텍스트와 결합 (모든 카드에 같은 문장 안 박이게)
  if (isJunior) {
    const tail = [
      `신입/주니어 지원 가능성이 JD에 명시 — 진입 가능`,
      `채용 조건이 신입~주니어 친화적이라 1차 검토 후보로 들어감`,
      `${co}가 신입 지원을 받는 포지션 — 진입 장벽 낮음`,
      `JD에 신입/주니어 OK 표현이 있어 지원 가능성 자체는 열림`,
    ];
    reasons.push(tail[Math.abs(hashStr(job.id + 'junior')) % tail.length]);
  } else if (matched.length >= 1) {
    reasons.push(`경력 조건이 모호 — 신입 지원 가능 여부를 인사 담당자에게 직접 확인 권장`);
  }

  return reasons.join('. ') + '.';
}

function hashStr(s) {
  let h = 0;
  for (const c of String(s)) h = ((h * 31) + c.charCodeAt(0)) | 0;
  return h;
}

function buildRisk(risks, stacks, domains, isJunior) {
  if (risks.length === 0) {
    if (!isJunior && !stacks.includes('Next.js') && !stacks.includes('React')) {
      return '경력/스택 매칭이 모호해 원본에서 신입 지원 가능 여부 + 실제 사용 스택 확인 필요';
    }
    return '명시적 위험 신호 없음. 원본에서 실제 업무 범위만 한 번 더 확인';
  }
  return risks.map(r => r.name).join(' · ') + '.';
}

function buildLearningPoint(stacks, risks, domains) {
  const points = [];
  const userStacks = ['Next.js', 'React', 'TypeScript'];
  const missing = userStacks.filter(s => !stacks.includes(s));
  if (missing.length === userStacks.length) {
    points.push(`사용자 주력 스택 미명시 — JD 원본에서 실제 사용 스택 확인이 1순위`);
  } else if (missing.length > 0) {
    points.push(`${missing.join('/')} 명시 여부 면접 단계 확인`);
  }
  if (stacks.includes('GraphQL') && !points.find(p => p.includes('GraphQL'))) points.push('GraphQL 실전 경험 보강 필요');
  if (stacks.includes('AWS') || stacks.includes('GCP')) points.push('클라우드 배포 경험은 Vercel 위주라 AWS/GCP 학습 항목 준비');
  if (risks.some(r => r.name.includes('백엔드'))) points.push('프론트 비중과 백엔드 책임 범위 면접 질문 준비');
  if (risks.some(r => r.name.includes('React Native'))) points.push('웹 PWA 경험은 있지만 RN 네이티브 기능은 보강 필요');
  if (domains.includes('AI/ML')) points.push('AI는 보조 강점으로 두고 메인 어필은 웹 시스템 구현 경험으로');
  if (points.length === 0) points.push('도메인/제품 사용자 흐름 이해를 자기소개에 녹여낼 수 있도록 준비');
  return points.slice(0, 3).join(' · ');
}

function buildMotivation(job, featured, stacks, domains, isJunior) {
  const co = job.company || '귀사';
  if (!featured) {
    return `${co}가 다루는 ${domains[0] || '서비스'} 영역에서 사용자 흐름과 운영 문제를 실제로 풀어본 경험을 적용하고 싶습니다.`;
  }
  // featured 별로 다른 말투
  const tags = featured.tag;
  if (featured === PROFILE.projects.venue) {
    return `${co}의 ${domains[0] || '운영 시스템'} 영역에서 ${tags} 경험처럼 현장 운영 흐름을 시스템으로 옮겨본 감각을 살리고 싶습니다.`;
  }
  if (featured === PROFILE.projects.sosangsangjeom) {
    return `${tags} 8개월 장기 협업에서 다듬은 Next.js/Storybook/SEO 흐름을 ${co}의 사용자 웹 품질에 기여하는 데 쓰고 싶습니다.`;
  }
  if (featured === PROFILE.projects.kiosk) {
    return `${tags}에서 다룬 대여/대기열/만료 정책 같은 실제 운영 로직 경험을 ${co}의 ${domains[0] || '제품'} 흐름에 적용하고 싶습니다.`;
  }
  if (featured === PROFILE.projects.agency) {
    return `비공개 고객사 웹 프로젝트와 MVP 부업에서 다듬은 랜딩/상담/퍼널 감각을 ${co}의 ${domains[0] || '고객 유입'} 흐름에 보태고 싶습니다.`;
  }
  if (featured === PROFILE.projects.ai) {
    return `${co}의 ${domains[0] || 'AI 활용 영역'}에 메인 강점인 웹 구현 + 보조 강점인 AI-native workflow를 함께 적용하고 싶습니다.`;
  }
  return `${tags} 경험을 바탕으로 ${co}의 ${domains[0] || '제품'}에 기여하고 싶습니다.`;
}

function buildQuestionsToAsk(stacks, risks, domains, isJunior) {
  const qs = [];
  if (!stacks.includes('Next.js') && !stacks.includes('React')) {
    qs.push('실제로 사용 중인 프론트 프레임워크와 버전');
  }
  if (risks.some(r => r.name.includes('백엔드'))) {
    qs.push('프론트엔드 / 백엔드 업무 비중과 신입 온보딩 체계');
  }
  if (!isJunior) {
    qs.push('신입/주니어 지원 가능 여부와 실제 채용 의지');
  }
  if (domains.includes('SaaS/B2B') || domains.includes('관리자/운영툴')) {
    qs.push('관리자/운영툴 비중과 사용자 측 제품 비중 분배');
  }
  if (risks.some(r => r.name.includes('파견'))) {
    qs.push('상주/파견 여부와 본사 근무 가능성');
  }
  if (qs.length === 0) qs.push('실제 사용 스택, 코드리뷰 문화, 신입 멘토링 형태');
  return qs.slice(0, 3).join(' / ');
}

function buildPortfolioPoint(featured, stacks, domains) {
  if (!featured) {
    return '소상상점(서비스 웹) + 쌍청문(운영 시스템) 중 공고 도메인과 가까운 쪽 주력으로 제출';
  }
  const others = Object.values(PROFILE.projects).filter(p => p !== featured).slice(0, 2);
  const support = others.map(p => p.tag).join(' / ');
  return `메인: ${featured.tag} 스토리. 보조: ${support}. ${featured.story.slice(0, 80)}로 자기소개 연결.`;
}

// ---------- 메인 ----------
function analyze(job) {
  const corpus = lowerCorpus(job);
  const stacks = extractStacks(corpus);
  const domains = extractDomains(corpus);
  const risks = extractRisks(corpus);
  const isJunior = JUNIOR_FRIENDLY.test(corpus) && !SENIOR_HINT.test(job.title || '');
  const featured = selectFeaturedProject(corpus, stacks, domains);
  const score = calcScore(stacks, domains, risks, corpus, isJunior, job);
  const recommendation = recommendationFor(score);

  return {
    fit_score: score,
    recommendation,
    core_stack_tags: stacks.slice(0, 6),
    domains_detected: domains.slice(0, 4),
    summary: buildSummary(job, score, recommendation, stacks, domains),
    reason: buildReason(job, stacks, domains, featured, isJunior),
    risk: buildRisk(risks, stacks, domains, isJunior),
    feature_project: featured ? featured.tag : '소상상점 / 쌍청문 중 공고 상세 확인 후 선택',
    learning_points: buildLearningPoint(stacks, risks, domains),
    motivation: buildMotivation(job, featured, stacks, domains, isJunior),
    questions_to_ask: buildQuestionsToAsk(stacks, risks, domains, isJunior),
    portfolio_link_point: buildPortfolioPoint(featured, stacks, domains),
    analyzed_at: new Date().toISOString(),
  };
}

function main() {
  const jobs = JSON.parse(fs.readFileSync(JOBS_PATH, 'utf8'));
  const existing = fs.existsSync(ANALYSIS_PATH)
    ? JSON.parse(fs.readFileSync(ANALYSIS_PATH, 'utf8'))
    : {};
  const arg = process.argv[2];
  const force = arg === '--force';

  const out = { ...existing };
  let added = 0, kept = 0, replaced = 0;
  for (const job of jobs) {
    if (job.status === 'expired') continue;
    if (existing[job.id] && !force) {
      kept += 1;
      continue;
    }
    out[job.id] = analyze(job);
    if (existing[job.id]) replaced += 1;
    else added += 1;
  }

  fs.writeFileSync(ANALYSIS_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`build-analysis: total=${Object.keys(out).length}, added=${added}, replaced=${replaced}, kept=${kept}`);

  // 분포 통계
  const scores = Object.values(out).map(a => a.fit_score);
  const dist = { '9-10': 0, '7-8': 0, '5-6': 0, '3-4': 0, '1-2': 0 };
  for (const s of scores) {
    if (s >= 9) dist['9-10'] += 1;
    else if (s >= 7) dist['7-8'] += 1;
    else if (s >= 5) dist['5-6'] += 1;
    else if (s >= 3) dist['3-4'] += 1;
    else dist['1-2'] += 1;
  }
  console.log('score distribution:', dist);

  // 매크로 검사 (자기검증)
  const reasons = Object.values(out).map(a => a.reason);
  const counts = {};
  for (const r of reasons) counts[r] = (counts[r] || 0) + 1;
  const dups = Object.entries(counts).filter(([_, n]) => n >= 3);
  if (dups.length) console.warn(`⚠️  duplicate reasons (>=3): ${dups.length} patterns`);
}

main();
