const fs = require('fs');

const dateStr = new Date().toISOString();

// Targets:
// 1. wanted_374718 (Front-End engineer, 파트리지시스템즈, 서울 강남구, 경력 1-3년, React/TypeScript/UI/DataOps) -> good fit
// 2. wanted_374393 (백엔드 엔지니어, 공간의가치, 서울 강남구, 경력 1-7년, Node.js/Nest.js) -> maybe 5-6 since it's backend. Actually let's do "보류"
// 3. jobkorea_49539386 (JAVA 개발자 (중급), ㈜스피링크, 신입, JAVA/RestAPI) -> bad fit for Next.js/React dev, "보류" or "비추천"
// 4. jobkorea_49572243 (부트캠프) -> non-job, but listed as active in jobs, mark as "비추천"

const analysis = JSON.parse(fs.readFileSync('data/analysis.json', 'utf8'));

// 1. wanted_374718 (Front-End)
analysis["wanted_374718"] = {
  "fit_score": 9,
  "recommendation": "강력 추천",
  "core_stack_tags": ["React", "TypeScript", "WebSocket"],
  "summary": "AI 및 데이터 플랫폼 파트리지시스템즈의 프론트엔드 포지션으로 AI 워크플로우 경험이 시너지",
  "reason": "파트리지시스템즈 Front-End engineer 채용 공고는 React와 TypeScript를 활용하여 복잡한 데이터를 시각화하는 역할을 요구합니다. 특히 AI 에이전트와 함께 개발하는 조직 문화가 있어, 사용자의 AI memory workflow 구축 경험이 강력한 차별점이 될 수 있습니다.",
  "risk": "데이터 스트리밍 및 Three.js/WebGL 활용과 같은 고성능 데이터 렌더링에 대한 추가 학습이 필요함",
  "feature_project": "AI-native workflow",
  "learning_points": "대용량 실시간 데이터 렌더링(Canvas/WebGL) 최적화 기법",
  "motivation": "자체적인 AI 에이전트 활용 개발 문화를 지닌 조직에서, 데이터 시각화라는 기술적 도전을 함께 이뤄가고 싶습니다.",
  "questions_to_ask": "프론트엔드 내에서 AI 에이전트 도입이 어떤 워크플로우로 이뤄지고 있는지 궁금합니다.",
  "portfolio_link_point": "AI memory workflow 구축 경험 및 소상상점의 데이터 연동 경험",
  "analyzed_at": dateStr
};

// 2. wanted_374393 (Backend)
analysis["wanted_374393"] = {
  "fit_score": 5,
  "recommendation": "보류",
  "core_stack_tags": ["Node.js", "Nest.js", "PostgreSQL"],
  "summary": "부동산 AI 스타트업 공간의가치의 백엔드 포지션, 메인 프론트엔드 방향과 차이",
  "reason": "공간의가치 백엔드 엔지니어 공고는 Node.js와 Nest.js를 중심으로 인프라와 플랫폼 개발을 담당하게 되어, 주력인 프론트엔드(Next.js/React) 비중이 낮아 보입니다. 프론트엔드 개발 비중을 먼저 확인할 필요가 있습니다.",
  "risk": "프론트엔드 업무보다 인프라/백엔드(DevOps, Kubernetes 등) 비중이 커서 주력 방향과 어긋남",
  "feature_project": "쌍청문 키오스크/대여 관리 시스템",
  "learning_points": "Nest.js 및 Kubernetes 기반의 DevOps 파이프라인 관리",
  "motivation": "풀스택 관점에서의 백엔드 역량을 키우며 AI 기반 부동산 자동가치산정 서비스에 기여하고 싶습니다.",
  "questions_to_ask": "백엔드 개발자로 합류 시, 프론트엔드 업무 비중이 어느 정도인지 확인이 필요합니다.",
  "portfolio_link_point": "쌍청문 프로젝트에서의 풀스택(Next.js/Supabase/Docker) 개발 경험 어필",
  "analyzed_at": dateStr
};

// 3. jobkorea_49539386 (Java)
analysis["jobkorea_49539386"] = {
  "fit_score": 2,
  "recommendation": "비추천",
  "core_stack_tags": ["JAVA", "RestAPI", "Git"],
  "summary": "㈜스피링크의 Java 중심 SI 포지션으로 React 주력과 불일치",
  "reason": "㈜스피링크의 JAVA 개발자 (중급) 공고는 Java 기반 백엔드 SI성 업무가 중심인 것으로 보여, React/Next.js 기반 웹 프론트엔드를 지향하는 사용자의 커리어 방향과 맞지 않습니다.",
  "risk": "Java 중심의 백엔드 SI성 업무로 프론트엔드(React/Next.js) 커리어 성장이 제한적임",
  "feature_project": "확인 필요",
  "learning_points": "Java 생태계 및 관련 프레임워크 학습 필요",
  "motivation": "지원하지 않음",
  "questions_to_ask": "해당 포지션에서 웹 프론트엔드 업무가 있는지 여부 확인 필요",
  "portfolio_link_point": "해당사항 없음",
  "analyzed_at": dateStr
};

// 4. jobkorea_49572243 (Bootcamp)
analysis["jobkorea_49572243"] = {
  "fit_score": 1,
  "recommendation": "비추천",
  "core_stack_tags": ["AI", "빅데이터", "풀스택"],
  "summary": "㈜휴먼교육센터의 취업연계 교육과정 공고로 실제 개발 직무 아님",
  "reason": "㈜휴먼교육센터의 AI인공지능/빅데이터/풀스택 부트캠프 공고는 실제 채용이 아닌 국비지원 연수생 모집이므로 현재 구직 목적에 부합하지 않습니다.",
  "risk": "실무 채용이 아닌 교육 과정 공고",
  "feature_project": "확인 필요",
  "learning_points": "해당사항 없음",
  "motivation": "지원하지 않음",
  "questions_to_ask": "해당사항 없음",
  "portfolio_link_point": "해당사항 없음",
  "analyzed_at": dateStr
};

fs.writeFileSync('data/analysis.json', JSON.stringify(analysis, null, 2));

console.log("Updated analysis.json");
