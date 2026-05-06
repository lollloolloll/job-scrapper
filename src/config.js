// 사용자 맞춤 구직공고 수집/분석 설정
// 스크래핑 조건은 나중에 이 파일만 수정해서 조정한다.

export const SEARCH_CONFIG = Object.freeze({
  keywords: ["프론트엔드", "웹개발", "풀스택", "Next.js", "React"],
  location: "서울",
  experience: "신입/주니어",
  maxPerSite: 30,
  headless: true,
  navigationTimeoutMs: 45_000,
  requestDelayMs: 800,
});

export const SOURCES = Object.freeze({
  saramin: {
    idPrefix: "saramin",
    label: "사람인",
    enabled: true,
  },
  wanted: {
    idPrefix: "wanted",
    label: "원티드",
    enabled: true,
  },
  jobkorea: {
    idPrefix: "jobkorea",
    label: "잡코리아",
    enabled: true,
  },
});

// Claude Code Routines가 점수화할 때 우선 가중치를 줄 사용자 맞춤 키워드.
export const USER_PROFILE = Object.freeze({
  targetRoles: ["프론트엔드", "웹개발", "풀스택", "주니어 웹 개발자"],
  primaryPositioning: "실제 운영 문제를 웹 시스템으로 바꿔본 경험이 있는 Next.js/React 기반 주니어 웹 개발자",
  strengths: [
    "Next.js/React/TypeScript 기반 사용자 웹 구현",
    "소상상점 장기 프로젝트: Storybook, API/OAuth, SEO/배포, GitHub 협업",
    "청소년 시설 쌍청문 공간대여 예약 시스템 단독 개발·운영",
    "키오스크/대여 관리 시스템: 대여/반납/대기열/만료 처리, Docker/PWA 경험",
    "웹에이전시/MVP 준비: 랜딩, 상담/문의, 고객 요구사항 정리",
    "AI 도구를 디버깅, 코드 이해, 문서화, 작업 계획, 기억 관리에 활용",
  ],
  preferredKeywords: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind",
    "shadcn",
    "Radix",
    "Zustand",
    "React Query",
    "Axios",
    "Storybook",
    "Git",
    "GitHub",
    "Vercel",
    "SEO",
    "Supabase",
    "Docker",
    "OAuth",
    "JWT",
    "관리자",
    "예약",
    "대여",
    "상점",
    "커머스",
    "지도",
    "채팅",
    "스타트업",
    "MVP",
    "에이전시",
    "소상공인",
  ],
  cautionKeywords: [
    "경력 3년",
    "3년 이상",
    "5년 이상",
    "시니어",
    "리드",
    "팀장",
    "퍼블리셔",
    "React Native",
    "파견",
    "Java/Spring 단독",
  ],
  projectMatchingRules: [
    {
      project: "소상상점",
      when: ["Next.js", "React", "TypeScript", "Storybook", "SEO", "Vercel", "OAuth", "API", "GitHub"],
    },
    {
      project: "쌍청문 공간대여 예약 시스템",
      when: ["예약", "관리자", "Supabase", "migration", "정책", "테스트"],
    },
    {
      project: "쌍청문 키오스크/대여 관리 시스템",
      when: ["키오스크", "대여", "물품", "PWA", "Docker", "SQLite", "Drizzle"],
    },
    {
      project: "웹에이전시/MVP 홈페이지",
      when: ["랜딩", "홈페이지", "상담", "문의", "MVP", "에이전시", "고객사"],
    },
    {
      project: "AI memory workflow",
      when: ["AI", "문서화", "자동화", "생산성", "knowledge", "workflow"],
    },
  ],
});

export const OUTPUT_PATHS = Object.freeze({
  dataDir: "data",
  jobsJson: "data/jobs.json",
  docsDir: "docs",
  indexHtml: "docs/index.html",
});
