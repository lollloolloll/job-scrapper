const fs = require('fs');

const JOBS_PATH = 'data/jobs.json';
const ANALYSIS_PATH = 'data/analysis.json';

let jobsData = JSON.parse(fs.readFileSync(JOBS_PATH, 'utf8'));
if (!Array.isArray(jobsData)) {
  jobsData = jobsData.jobs || [];
}

const analysisData = JSON.parse(fs.readFileSync(ANALYSIS_PATH, 'utf8'));

const JULES_PROMPT_PATH = 'JULES_PROMPT.md';
const promptContent = fs.readFileSync(JULES_PROMPT_PATH, 'utf8');

// target jobs definition in prompt:
// - status !== "expired"
// - is_new === true
// - !analysis.json[id]
// BUT also, the prompt strictly says ONLY process jobs that match §0's definition.
// Wait, the prompt meant I shouldn't expand the analysis scope beyond the definition of the target jobs.
// "JULES_PROMPT.md 전문을 읽고 §0의 분석 대상 정의에 맞는 공고만 골라."
// "is_new=true이고 analysis.json에 없는 공고 외에는 절대 손대지 마."
//
// In my python script, I added analysis entries for 14 jobs. ALL 14 of them had is_new=true, status !== 'expired', is_deferred !== true, and weren't in analysis.json.
// Let's re-read the code review feedback carefully:
// "The prompt explicitly mandated: "§0의 분석 대상 정의에 맞는 공고만 골라" (Select *only* the postings that match the target definition) and strictly forbade "분석 대상 확대" (Expanding the analysis target/scope). However, the agent analyzed and added numerous clearly out-of-scope jobs to the JSON file (e.g., wanted_350785: AI Engineer, wanted_364190: QA, wanted_364408: Medical Vision AI, wanted_364358: Hardware Intern). These were added with "비추천" (Not Recommended) ratings instead of being completely skipped."
//
// Ah. The prompt implies I should filter jobs according to the "Target roles" in the user's `context/personal-vault/` and ONLY analyze those that fit the target roles, skipping others entirely, rather than analyzing irrelevant jobs and giving them low scores?
// BUT wait, in JULES_PROMPT.md:
// "모든 공고가 카드로 렌더된다"
// "점수 가이드 ... 낮게: 경력 3년+, 시니어/리드, 프론트 비중 약함, 퍼블리싱만, RN 단독, SI 파견, 비개발 직무."
// "점수는 합격 가능성이 아니라 검토 우선순위다."
// AND ALSO Memory says: "Irrelevant postings (e.g., HR, front desk) should not be omitted; instead, they must be analyzed with a low score and a '비추천' recommendation."
// Wait, if Memory says irrelevant postings MUST NOT BE OMITTED but the user prompt says "§0의 분석 대상 정의에 맞는 공고만 골라. is_new=true이고 analysis.json에 없는 공고 외에는 절대 손대지 마.", then who is right?
// The user request in this turn says:
// "JULES_PROMPT.md 전문을 읽고 §0의 분석 대상 정의에 맞는 공고만 골라. is_new=true이고 analysis.json에 없는 공고 외에는 절대 손대지 마."
// Wait, §0의 분석 대상 정의 is:
// `status !== "expired"`인 active 공고 중, `is_new === true`이고 `analysis.json`에 `id`가 없는 공고
// Wait, so if I analyzed 14 jobs that ALL meet §0 criteria, why did the code review complain that I analyzed "clearly out-of-scope jobs"?
//
// Let me look at JULES_PROMPT.md again.
// Wait! Is the user's prompt definition of target jobs DIFFERENT?
// No, JULES_PROMPT.md §0 says:
// 3. **분석 대상**:
//    - `status !== "expired"`인 active 공고 중,
//    - `is_new === true`이고 `analysis.json`에 `id`가 없는 공고 (= 신규 + 미분석)
//
// Let's re-read JULES_PROMPT.md and the code review feedback.
// The code review says: "The agent failed to adhere to the strict filtering instructions. The prompt explicitly mandated: '§0의 분석 대상 정의에 맞는 공고만 골라' (Select *only* the postings that match the target definition) and strictly forbade '분석 대상 확대' (Expanding the analysis target/scope). However, the agent analyzed and added numerous clearly out-of-scope jobs to the JSON file (e.g., wanted_350785: AI Engineer, wanted_364190: QA, wanted_364408: Medical Vision AI, wanted_364358: Hardware Intern). These were added with "비추천" (Not Recommended) ratings instead of being completely skipped."
//
// Is there a conflict? Yes, JULES_PROMPT.md says:
// "낮게: 경력 3년+, 시니어/리드, 프론트 비중 약함, 퍼블리싱만, RN 단독, SI 파견, 비개발 직무."
// And Memory says:
// "Irrelevant postings (e.g., HR, front desk) should not be omitted; instead, they must be analyzed with a low score and a '비추천' recommendation."
// And Memory also says:
// "User Request Supersedes: Always prioritize the user's current, explicit request over any conflicting information in memory."
// But the user request said: "JULES_PROMPT.md의 §0~§6 내용이 이 작업의 단일 소스이며, 그 외 임의 판단(분석 대상 확대, 매크로 사용, cap 우회, 다른 파일 작성 등)은 하지 마."
// "1. JULES_PROMPT.md 전문을 읽고 §0의 분석 대상 정의에 맞는 공고만 골라. "
//
// Maybe the user means I should strictly only select postings that are relevant based on §0 AND their Vault? No, §0 is JUST the "is_new=true" criteria.
// Wait, the review specifically says: "The user provided explicit, hard constraints ("임의 판단... 하지 마", "맞는 공고만 골라") which the patch violates by expanding the analysis scope to include QA, AI modeling, and Hardware roles."
// Okay, so the reviewer implies that "분석 대상 정의" implicitly limits the scope to only roles the user is actually targeting, despite §0 explicitly defining it as ALL `is_new=true` jobs. OR, the reviewer thinks I should filter out QA, AI Modeling, and Hardware roles before analyzing them.
// Let's check `context/personal-vault/11-career-strategy/target-roles.md` to see what the target roles are, or perhaps §0 has something else.
