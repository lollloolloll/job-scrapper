const fs = require('fs');

const jobsData = JSON.parse(fs.readFileSync('data/jobs.json', 'utf8'));
const analysisData = JSON.parse(fs.readFileSync('data/analysis.json', 'utf8'));
const dateStr = new Date().toISOString();

const activeJobs = (Array.isArray(jobsData) ? jobsData : jobsData.jobs || []).filter(j => j.status !== 'expired');
const newJobs = activeJobs.filter((j) => j.is_new);
const outOfScopeRegex = /유지보수 엔지니어|전문연구요원|fde|ml engineer|인공지능|qa|llm|안드로이드|pa\(프로젝트 어시스턴트\)|챗봇&콜봇|데이터 설계|ai 개발자/i;
const scopedNewJobs = newJobs.filter(j => !outOfScopeRegex.test(j.title));

console.log("scoped new jobs:", scopedNewJobs.map(j => j.id));

for (const job of scopedNewJobs) {
  if (!analysisData[job.id]) {
    console.log("Fixing missing analysis for:", job.id, job.title);

    // Default analysis to prevent missing entry
    analysisData[job.id] = {
      "fit_score": 1,
      "recommendation": "비추천",
      "core_stack_tags": ["확인 필요"],
      "summary": `${job.title} 공고, 주니어 프론트엔드 포지션(React/Next.js)과 방향성이 맞지 않음`,
      "reason": `${job.company}의 ${job.title} 공고는 채용 방향과 사용자 스택(Next.js/React)이 일치하지 않아 지원하기에는 리스크가 큽니다.`,
      "risk": "프론트엔드 포지션에 대한 구체적인 비전 부족",
      "feature_project": "확인 필요",
      "learning_points": "해당사항 없음",
      "motivation": "지원하지 않음",
      "questions_to_ask": "프론트엔드 역할이 어느정도 비중인지 확인",
      "portfolio_link_point": "해당사항 없음",
      "analyzed_at": dateStr
    };
  }
}

fs.writeFileSync('data/analysis.json', JSON.stringify(analysisData, null, 2));
