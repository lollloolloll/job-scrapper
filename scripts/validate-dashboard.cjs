#!/usr/bin/env node
// generate_html.cjs 산출물(docs/index.html)과 data/analysis.json의 품질 검증.
// commit/push 직전에 호출. 실패 시 exit 1.

const fs = require('node:fs');

const errors = [];
const warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { fail(`${p} read/parse failed: ${e.message}`); return null; }
}

const HTML_PATH = 'docs/index.html';
const JOBS_PATH = 'data/jobs.json';
const ANALYSIS_PATH = 'data/analysis.json';

if (!fs.existsSync(HTML_PATH)) fail(`${HTML_PATH} 없음`);
if (!fs.existsSync(JOBS_PATH)) fail(`${JOBS_PATH} 없음`);
if (!fs.existsSync(ANALYSIS_PATH)) fail(`${ANALYSIS_PATH} 없음`);

if (errors.length) {
  console.error('❌ validate-dashboard:');
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}

const html = fs.readFileSync(HTML_PATH, 'utf8');
const jobs = readJson(JOBS_PATH) || [];
const analysis = readJson(ANALYSIS_PATH) || {};
const packageJson = readJson('package.json') || {};

// ---------- 1. 필수 HTML 요소
const requiredSnippets = [
  ['dashboard title', 'Frontend Job Radar'],
  ['search input', 'id="searchInput"'],
  ['source filter', 'id="sourceFilter"'],
  ['recommendation filter', 'id="recommendationFilter"'],
  ['sort select', 'id="sortSelect"'],
  ['result count', 'id="resultCount"'],
  ['top skills', 'Top Skills'],
  ['empty state', 'id="emptyState"'],
  ['fit-score data attr', 'data-fit-score='],
  ['safe external links pattern', 'rel="noopener noreferrer"'],
  ['generated metadata', 'Generated from data/jobs.json'],
];
for (const [label, snippet] of requiredSnippets) {
  if (!html.includes(snippet)) fail(`HTML missing: ${label} (${snippet})`);
}
if (!/class="[^"]*job-card/.test(html)) fail('Expected at least one job card');
if (!/data-search="[^"]+"/.test(html)) fail('Expected data-search metadata');
if (!/data-recommendation="(강력 추천|추천|보류|비추천)"/.test(html))
  fail('Expected recommendation metadata');

// ---------- 2. package.json scripts
if (!packageJson.scripts || !packageJson.scripts['generate:html'])
  fail('package.json scripts.generate:html 누락');
if (!packageJson.scripts || !packageJson.scripts['validate:dashboard'])
  fail('package.json scripts.validate:dashboard 누락');

// ---------- 3. 카드 수 vs active 공고 수
const activeJobs = jobs.filter((j) => j.status !== 'expired');
const cardCount = (html.match(/data-fit-score=/g) || []).length;
if (cardCount !== activeJobs.length) {
  fail(`카드 수 불일치: html=${cardCount}, active jobs=${activeJobs.length} (jobs total=${jobs.length})`);
}

// ---------- 4. 모든 카드 url이 jobs.json에 존재
const jobUrls = new Set(jobs.map((j) => j.url).filter(Boolean));
const cardUrls = (html.match(/href="(https?:\/\/[^"]+)"[^>]*rel="noopener noreferrer"/g) || [])
  .map((m) => (m.match(/href="([^"]+)"/) || [])[1])
  .filter(Boolean);
const orphanUrls = cardUrls.filter((u) => !jobUrls.has(u));
if (orphanUrls.length > 0) {
  warn(`jobs.json에 없는 카드 url ${orphanUrls.length}건: ${orphanUrls[0]}…`);
}

// ---------- 5. analysis.json: 신규(is_new) 공고는 모두 분석 entry가 있어야 함
const newJobs = activeJobs.filter((j) => j.is_new);
const outOfScopeRegex = /유지보수 엔지니어|전문연구요원|fde|ml engineer|인공지능|qa|llm|안드로이드|pa\(프로젝트 어시스턴트\)|챗봇&콜봇|데이터 설계|ai 개발자/i;
const scopedNewJobs = newJobs.filter(j => !outOfScopeRegex.test(j.title));
const newMissing = scopedNewJobs.filter((j) => !analysis[j.id]);
if (scopedNewJobs.length > 0 && newMissing.length > 0) {
  fail(`신규 공고 분석 누락 ${newMissing.length}/${scopedNewJobs.length}: ${newMissing.slice(0, 5).map((j) => j.id).join(', ')}${newMissing.length > 5 ? '…' : ''}`);
}

// ---------- 6. analysis 필수 필드
const REQUIRED_FIELDS = ['fit_score', 'recommendation', 'summary', 'reason'];
const incomplete = [];
for (const [id, a] of Object.entries(analysis)) {
  for (const f of REQUIRED_FIELDS) {
    const v = a && a[f];
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
      incomplete.push(`${id}.${f}`);
      break;
    }
  }
}
if (incomplete.length > 0) {
  fail(`analysis 필수 필드 누락 ${incomplete.length}건: ${incomplete.slice(0, 5).join(', ')}${incomplete.length > 5 ? '…' : ''}`);
}

// ---------- 6-1. recommendation 값은 PRD §3 enum 4개 중 하나만 허용
const VALID_RECS = ['강력 추천', '추천', '보류', '비추천'];
const invalidRecs = [];
for (const [id, a] of Object.entries(analysis)) {
  const r = a && a.recommendation;
  if (r && !VALID_RECS.includes(String(r).trim())) {
    invalidRecs.push(`${id}: "${r}"`);
  }
}
if (invalidRecs.length > 0) {
  fail(`recommendation 값 PRD enum 위반 ${invalidRecs.length}건 (허용: ${VALID_RECS.join('/')}): ${invalidRecs.slice(0, 5).join(', ')}${invalidRecs.length > 5 ? '…' : ''}`);
}

// ---------- 6-2. fit_score는 1~10 정수
const invalidScores = [];
for (const [id, a] of Object.entries(analysis)) {
  const s = a && a.fit_score;
  if (typeof s !== 'number' || !Number.isInteger(s) || s < 1 || s > 10) {
    invalidScores.push(`${id}: ${s}`);
  }
}
if (invalidScores.length > 0) {
  fail(`fit_score 1~10 정수 위반 ${invalidScores.length}건: ${invalidScores.slice(0, 5).join(', ')}`);
}

// ---------- 6-3. score-recommendation 정합성 (대략적 일관성)
const inconsistent = [];
for (const [id, a] of Object.entries(analysis)) {
  if (!a || typeof a.fit_score !== 'number' || !VALID_RECS.includes(a.recommendation)) continue;
  const s = a.fit_score;
  const r = a.recommendation;
  // 9-10: 강력 추천만 / 7-8: 강력추천 or 추천 / 4-6: 추천/보류 / 1-3: 보류/비추천
  let ok;
  if (s >= 9) ok = r === '강력 추천';
  else if (s >= 7) ok = ['강력 추천', '추천'].includes(r);
  else if (s >= 4) ok = ['추천', '보류'].includes(r);
  else ok = ['보류', '비추천'].includes(r); // s <= 3
  if (!ok) inconsistent.push(`${id}: score=${s} but rec="${r}"`);
}
if (inconsistent.length > 0) {
  warn(`score-recommendation 정합성 의심 ${inconsistent.length}건: ${inconsistent.slice(0, 3).join(', ')}`);
}

// ---------- 7. 동일 reasoning 문장 반복 (3회 이상 동일하면 fail)
const reasons = Object.values(analysis)
  .map((a) => (a && a.reason ? String(a.reason).trim() : ''))
  .filter((s) => s.length > 0);
const reasonCounts = {};
for (const r of reasons) reasonCounts[r] = (reasonCounts[r] || 0) + 1;
const duplicatedReasons = Object.entries(reasonCounts).filter(([, n]) => n >= 3);
if (duplicatedReasons.length > 0) {
  fail(`동일 reason ${duplicatedReasons.length}종이 3회 이상 반복. 예: "${duplicatedReasons[0][0].slice(0, 60)}…" (${duplicatedReasons[0][1]}회)`);
}

// ---------- 8. summary 동일 반복 (warning, 5회 이상)
const summaries = Object.values(analysis)
  .map((a) => (a && a.summary ? String(a.summary).trim() : ''))
  .filter(Boolean);
const sumCounts = {};
for (const s of summaries) sumCounts[s] = (sumCounts[s] || 0) + 1;
const dupSum = Object.entries(sumCounts).filter(([, n]) => n >= 5);
if (dupSum.length > 0) {
  warn(`동일 summary 5회 이상 반복: "${dupSum[0][0].slice(0, 60)}…"`);
}

// ---------- 9. 점수 분포
const scores = Object.values(analysis)
  .map((a) => Number(a && a.fit_score))
  .filter((n) => Number.isFinite(n));
if (scores.length > 5) {
  const high = scores.filter((s) => s >= 9).length;
  const ratio = high / scores.length;
  if (ratio > 0.4) {
    fail(`9~10점 비율 ${(ratio * 100).toFixed(0)}% (>40%): over-recommendation 의심. n=${scores.length}, high=${high}`);
  }
}

// ---------- 10. 민감 패턴 누출
const SENSITIVE = [
  ['client-confidential frontmatter', /privacy:\s*client-confidential/],
  ['client identifier (dgsajang)', /\bdgsajang\b/i],
  ['client identifier (pox-user-web)', /\bpox-user-web\b/i],
  ['local filesystem path', /\/host\/users\//i],
  ['windows desktop path', /[Cc]:[\\/]Users[\\/]/],
  ['API key prefix', /\bsk-[a-zA-Z0-9_-]{20,}\b/],
  ['Anthropic OAuth token', /\bsk-ant-[a-zA-Z0-9_-]{20,}\b/],
];
for (const [name, re] of SENSITIVE) {
  if (re.test(html)) fail(`민감 패턴 (HTML): ${name}`);
  const blob = JSON.stringify(analysis);
  if (re.test(blob)) fail(`민감 패턴 (analysis.json): ${name}`);
}

// ---------- 11. 빈 필드 비율
const checked = ['summary', 'reason', 'risk', 'feature_project', 'motivation'];
let total = 0, empty = 0;
for (const a of Object.values(analysis)) {
  for (const f of checked) {
    total += 1;
    if (!a || !a[f] || String(a[f]).trim().length === 0) empty += 1;
  }
}
if (total > 0) {
  const ratio = empty / total;
  if (ratio > 0.3) fail(`analysis 빈 필드 비율 ${(ratio * 100).toFixed(0)}% (>30%)`);
}

// ---------- 결과
console.log('--- validate-dashboard ---');
console.log(`jobs.json: total=${jobs.length}, active=${activeJobs.length}, new=${newJobs.length}`);
console.log(`analysis.json: entries=${Object.keys(analysis).length}`);
console.log(`docs/index.html: cards=${cardCount}`);
if (scores.length) {
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  console.log(`scores: avg=${avg}, high(≥9)=${scores.filter((s) => s >= 9).length}, low(≤4)=${scores.filter((s) => s <= 4).length}`);
}
if (warnings.length) {
  console.log('\n⚠️  warnings:');
  for (const w of warnings) console.log('  -', w);
}
if (errors.length) {
  console.error('\n❌ FAILED:');
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}
console.log('\n✅ all checks passed');
process.exit(0);
