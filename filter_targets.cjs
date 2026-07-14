const fs = require('fs');

// Read JULES_PROMPT.md to understand filtering rules
// Section 0 says: "3. 분석 대상: status !== "expired" 인 active 공고 중, is_new === true 이고 analysis.json 에 id가 없는 공고"
// Memory rule: "DO NOT analyze or add out-of-scope roles (e.g., AI Engineer, Network Engineer, QA) to analysis.json, even if they are marked is_new=true. Only process jobs that match the target domain definition in JULES_PROMPT.md §0. Ignoring out-of-scope jobs entirely is required to obey the 'do not expand analysis scope' constraint."
// PRD rule: "1. 배경: 사용자는 Next.js/React 기반 웹 개발을 중심으로 취업을 준비하고 있다."
// "메인 포지션은 다음과 같이 둔다. 실제 운영 문제를 웹 시스템으로 바꿔본 경험이 있는 Next.js/React 기반 주니어 웹 개발자."
// "6. 스크래핑 조건: 주니어 웹개발/프론트엔드 채용공고"

const jobsData = JSON.parse(fs.readFileSync('data/jobs.json', 'utf8'));
const analysisData = JSON.parse(fs.readFileSync('data/analysis.json', 'utf8'));
const jobs = Array.isArray(jobsData) ? jobsData : (jobsData.jobs || []);

// Helper to determine if a job is in scope based on PRD and Prompt
const isTargetScope = (job) => {
  // Discard non-web dev roles like AI, Network, QA, Hardware, System Engineer, DB Admin, etc.
  const titleAndStack = (job.title + " " + job.stack).toLowerCase();

  if (titleAndStack.includes('ai개발자') || titleAndStack.includes('ai엔지니어') || titleAndStack.includes('머신러닝') || titleAndStack.includes('mlops') || titleAndStack.includes('vision ai')) return false;
  if (titleAndStack.includes('네트워크') || titleAndStack.includes('시스템엔지니어') || titleAndStack.includes('qa') || titleAndStack.includes('하드웨어') || titleAndStack.includes('보안') || titleAndStack.includes('펌웨어') || titleAndStack.includes('모터제어')) return false;

  // It should be related to frontend or web development
  const isWebDev = titleAndStack.includes('프론트') || titleAndStack.includes('front') || titleAndStack.includes('웹') || titleAndStack.includes('web') || titleAndStack.includes('풀스택') || titleAndStack.includes('백엔드');

  // Allow backend just in case, but filter out obvious non-web
  return isWebDev;
};

const targets = jobs.filter(j => {
  if (j.status === 'expired') return false;
  if (j.is_new !== true) return false;
  if (j.is_deferred === true) return false;
  if (analysisData[j.id]) return false;

  return isTargetScope(j);
});

console.log(JSON.stringify(targets.map(t => ({id: t.id, title: t.title, stack: t.stack, experience: t.experience})), null, 2));
