# 구직공고 자동 수집 + AI 분석 시스템 PRD

> 목적: 사람인, 원티드, 잡코리아의 주니어 웹개발/프론트엔드 채용공고를 자동 수집하고, 사용자의 실제 프로젝트 경험과 취업 전략에 맞춰 AI가 우선순위·지원 전략·보완 학습 포인트를 분석한 뒤 GitHub Pages 대시보드로 배포한다.

## 1. 배경

사용자는 Next.js/React 기반 웹 개발을 중심으로 취업을 준비하고 있다. 단순히 “신입 프론트엔드 공고 모음”을 보는 것이 아니라, 다음 사용자의 강점과 제약을 반영해 **지원 우선순위**를 자동으로 판단해야 한다.

### 1.1 사용자 강점 요약

- **소상상점/소상공인 협업 플랫폼**: 약 8개월 이상 장기 프로젝트 후보. Next.js/React/TypeScript, Storybook, API 연동, OAuth, SEO/배포, GitHub 협업 경험.
- **청소년 시설 쌍청문 실사용 프로젝트**: 근로장학생으로 공간대여 예약 시스템과 키오스크/대여 관리 시스템을 단독 풀스택 개발·운영한 경험.
- **웹에이전시/MVP 부업 준비**: 친구와 공식 홈페이지 및 비공개 고객사 웹 프로젝트를 진행하며 랜딩, 상담/문의, 퍼널, 고객 요구사항 정리 경험.
- **AI-native workflow**: Claude Code, Codex, OpenCode, Hermes Agent, Obsidian/Graphify 기반 개인 memory workflow 구축 경험.

### 1.2 취업 포지셔닝

메인 포지션은 다음과 같이 둔다.

> 실제 운영 문제를 웹 시스템으로 바꿔본 경험이 있는 Next.js/React 기반 주니어 웹 개발자.

AI 활용은 메인 헤드라인이 아니라 보조 강점으로 둔다.

> AI 도구를 코드 이해, 오류 로그 분석, 디버깅 방향 검토, 작업 계획 수립, 문서화, 장기 기억 관리에 활용하는 개발자.

## 2. 목표

1. 사람인, 원티드, 잡코리아에서 매일 채용공고를 자동 수집한다.
2. 사용자의 강점과 맞는 공고를 높은 점수로 정렬한다.
3. 각 공고별로 “왜 맞는지 / 왜 위험한지 / 어떤 프로젝트를 앞세울지”를 분석한다.
4. GitHub Pages에 모바일 대응 다크 테마 대시보드를 배포한다.
5. 사용자가 매일 아침 지원 후보를 빠르게 확인하고, 지원 전략을 세울 수 있게 한다.

## 3. 비목표

- 자동 지원서 제출은 하지 않는다.
- 사이트 약관을 우회하거나 로그인/캡차/유료 API를 우회하지 않는다.
- 개인정보, 이력서 파일, 고객사 비공개 정보(`pox-user-web` 상세 등)를 GitHub Pages에 노출하지 않는다.
- 공고 원문 전체를 복제해 저장하지 않는다. 필요한 요약/링크/메타데이터 중심으로 저장한다.

## 4. 기술 스택

- Playwright (Node.js) — 스크래핑
- dotenv — 로컬 환경변수 관리
- GitHub Actions — 매일 크론 + 수동 실행
- Claude Code Routines — AI 분석 및 `docs/index.html` 생성
- GitHub Pages — 정적 대시보드 호스팅

## 5. 디렉토리 구조

```text
job-scraper/
├── PRD.md
├── scrapers/
│   ├── saramin.js
│   ├── wanted.js
│   └── jobkorea.js
├── scripts/
│   └── run-all.js
├── src/
│   └── config.js
├── docs/
│   └── index.html
├── data/
│   └── jobs.json
├── .github/
│   └── workflows/
│       └── scrape.yml
├── .env.example
├── package.json
└── README.md
```

## 6. 스크래핑 조건

조건은 `src/config.js`에서 상수로 분리해 나중에 쉽게 수정한다.

```js
export const SEARCH_CONFIG = {
  keywords: ["프론트엔드", "웹개발", "풀스택", "Next.js", "React"],
  location: "서울",
  experience: "신입/주니어",
  maxPerSite: 30,
};
```

### 6.1 사용자 맞춤 우선 키워드

공고 분석에서 높은 가중치를 줄 키워드:

- Next.js
- React
- TypeScript
- JavaScript
- Tailwind CSS
- Zustand
- React Query
- Axios
- Storybook
- Git/GitHub 협업
- Vercel
- SEO
- Supabase
- Docker
- OAuth/JWT
- 관리자 페이지
- 예약/대여/커머스/상점/지도/채팅
- 스타트업/MVP/에이전시/소상공인/로컬 비즈니스

### 6.2 위험 신호 키워드

낮은 점수 또는 주의 표시:

- 경력 3년 이상 필수
- 5년 이상
- 리드/시니어
- 고급 백엔드 단독 운영
- React Native 단독
- 퍼블리싱만 담당
- 과도한 SI 파견 중심
- 스택이 Java/Spring 백엔드만 있고 프론트 역할이 약한 공고

## 7. jobs.json 스키마

```json
[
  {
    "id": "saramin_001",
    "source": "saramin",
    "title": "채용공고 제목",
    "company": "회사명",
    "location": "지역",
    "experience": "경력조건",
    "stack": "기술스택 원문",
    "salary": "급여 (있을 경우)",
    "url": "원본 링크",
    "deadline": "마감일",
    "scraped_at": "수집시각 ISO8601"
  }
]
```

## 8. AI 분석 요구사항

Claude Code Routines는 `data/jobs.json`을 읽고 공고별 분석 결과를 `docs/index.html`에 반영한다.

### 8.1 공고별 분석 항목

- 적합도 점수: 1~10
- 핵심 스택 태그
- 한줄 요약
- 추천 여부: 강력 추천 / 추천 / 보류 / 비추천
- 추천 이유
- 위험 요소
- 지원 시 앞세울 사용자 프로젝트
  - 소상상점
  - 쌍청문 공간대여 예약 시스템
  - 쌍청문 키오스크/대여 관리 시스템
  - 웹에이전시/MVP 홈페이지
  - AI memory workflow
- 보완 학습 포인트
- 예상 자기소개/지원동기 한 줄

### 8.2 점수 가이드

- 9~10점: Next.js/React/TypeScript + 주니어 가능 + 서비스/스타트업/사용자 웹 + 사용자의 프로젝트와 직접 매칭.
- 7~8점: React/TypeScript 중심이지만 일부 조건 확인 필요.
- 5~6점: 웹개발 관련성은 있으나 스택/경력/도메인 매칭이 약함.
- 3~4점: 기술 스택이나 경력 조건이 사용자와 멀다.
- 1~2점: 시니어/백엔드 단독/비개발/공개 위험이 커서 비추천.

### 8.3 사용자 프로젝트 매칭 규칙

- **Next.js, Storybook, SEO, Vercel, API 연동** → 소상상점 우선.
- **예약, 관리자, Supabase, 정책, migration** → 쌍청문 공간대여 예약 시스템 우선.
- **키오스크, 대여, 물품관리, PWA, Docker, 로컬 DB** → 키오스크/대여 관리 시스템 우선.
- **랜딩, 홈페이지, 고객사, MVP, 에이전시, 문의/상담** → 웹에이전시/MVP 경험 우선.
- **AI 도구, 생산성, 문서화, knowledge management** → AI memory workflow 보조 강점.

## 9. GitHub Actions

트리거:

- schedule: 매일 07:00 KST = UTC 22:00 (전일)
- workflow_dispatch: 수동 실행

스텝:

1. checkout
2. Node.js 설치
3. npm ci
4. Playwright browser 설치
5. `npm run scrape` 실행 → `data/jobs.json` 생성
6. 변경된 `data/jobs.json` commit + push
7. Claude Code Routines API로 POST 요청
   - endpoint: `${{ secrets.ROUTINE_ENDPOINT }}`
   - token: `${{ secrets.ROUTINE_TOKEN }}`
   - body: `{ "message": "jobs.json 업데이트 완료. data/jobs.json 분석 후 사용자 맞춤 취업 전략 대시보드 docs/index.html 생성해줘" }`

## 10. 분석 루틴 프롬프트

> 실제 사용 중인 증분 분석 프롬프트는 [`JULES_PROMPT.md`](./JULES_PROMPT.md)에 있다.
> 아래는 PRD 시점의 reference 프롬프트이며, 운영 중인 프롬프트와 다를 수 있다.



```text
레포지토리의 data/jobs.json을 읽어서 각 공고를 사용자 맞춤형으로 분석하고 docs/index.html을 생성해서 커밋해줘.

사용자 프로필:
- Next.js/React/TypeScript 기반 주니어 웹 개발자 지망.
- 소상상점: 약 8개월 장기 프로젝트. Next.js, React, TypeScript, Storybook, API/OAuth, SEO/배포, GitHub 협업 경험.
- 쌍청문 공간대여 예약 시스템: 청소년 시설 근로장학생으로 실제 기관 운영 문제를 해결하기 위해 Next.js/Supabase 기반 예약 시스템을 단독 개발·운영.
- 쌍청문 키오스크/대여 관리 시스템: Next.js/TypeScript/Drizzle/SQLite/Docker/PWA 기반 대여 관리 시스템 경험.
- 웹에이전시/MVP 부업 준비: 친구와 공식 홈페이지, 비공개 고객사 웹 프로젝트, 랜딩/상담/퍼널/요구사항 정리 경험.
- AI-native workflow: Claude Code, Codex, OpenCode, Hermes Agent, Obsidian/Graphify 기반 memory workflow 경험. 단, AI는 메인 헤드라인이 아니라 보조 강점.

공고별 분석 항목:
- 적합도 점수: 1~10
- 핵심 스택 태그
- 한줄 요약
- 추천 여부: 강력 추천 / 추천 / 보류 / 비추천
- 추천 이유
- 위험 요소
- 지원 시 앞세울 사용자 프로젝트
- 보완 학습 포인트
- 예상 지원동기 한 줄

점수 기준:
- Next.js/React/TypeScript, 주니어 가능, 사용자 웹/서비스/스타트업/MVP/예약/상점/관리자 기능과 맞으면 높게.
- 경력 3년 이상 필수, 시니어/리드, 프론트 비중 약함, 퍼블리싱만, 과도한 백엔드 단독 요구는 낮게.

index.html 요구사항:
- 라이트 테마 (#f7f8fb 배경, indigo(#6366f1) 포인트, 본문 #1f2937, 카드 #ffffff)
- 단순 목록이 아니라 `Frontend Job Radar` 대시보드로 생성할 것
- 상단 Hero에는 `Generated from data/jobs.json`, 마지막 수집 시각, 점수 기준 안내를 표시할 것
- KPI 카드: 전체 공고 수 / 강력 추천 수 / 보류+비추천 수 / 마지막 수집 시각
- Top Skills 인사이트 패널: 공고에서 감지된 핵심 스택 빈도 막대 표시
- 카드형 UI (border #e2e8f0, soft shadow, hover elevation)
- 적합도 점수 내림차순 기본 정렬
- 상단 컨트롤: 통합 검색, 출처 필터(전체/사람인/원티드/잡코리아), 추천 단계 필터(전체/강력 추천/추천/보류/비추천), 정렬(점수 높은순/낮은순/회사명/마감일 텍스트순)
- 검색/필터 결과 수와 empty state를 표시할 것
- 각 카드에는 출처, 점수 배지, 추천 단계, 제목/회사, 위치/경력/마감일/수집시각, 핵심 태그, 추천 이유, 위험 요소, 앞세울 프로젝트, 보완 학습 포인트, 지원동기 한 줄, 원본 링크 버튼을 포함할 것
- 원본 링크는 새 탭으로 열고 `rel="noopener noreferrer"`를 포함할 것
- 모바일 반응형
- 민감정보 또는 비공개 고객사 상세 정보는 출력하지 말 것
- generator(`generate_html.cjs`)에서 HTML escaping/safe URL 처리를 적용해 공고 데이터가 HTML/스크립트로 실행되지 않게 할 것
- 생성 결과는 `scripts/validate-dashboard.cjs` 같은 정적 검증으로 핵심 UI 요소와 카드 메타데이터 존재를 확인할 것

커밋 메시지: chore: AI 분석 결과 업데이트 YYYY-MM-DD
```

## 11. GitHub Pages UI 요구사항

상단 요약:

- 총 공고 수
- 강력 추천 수
- 보류/비추천 수
- 사이트별 수집 수
- 마지막 수집 시각

카드 필드:

- 점수 배지
- 추천 여부 배지
- 제목/회사
- 사이트/source
- 위치/경력/마감일
- 핵심 스택 태그
- 한줄 요약
- 추천 이유
- 위험 요소
- 앞세울 프로젝트
- 보완 학습 포인트
- 원본 링크

## 12. 작업 순서

1. `package.json` 작성 + 의존성 설치
2. `src/config.js` 작성 — 검색 조건/분석 키워드 상수화
3. `scrapers/saramin.js` 작성 + 단독 실행 테스트
4. `scrapers/wanted.js` 작성 + 단독 실행 테스트
5. `scrapers/jobkorea.js` 작성 + 단독 실행 테스트
6. `scripts/run-all.js` 작성 — 3개 병렬 실행, 결과 병합, `data/jobs.json` 저장
7. `.github/workflows/scrape.yml` 작성
8. `.env.example` 작성
9. `README.md` 작성
10. GitHub Pages/Routines 설정 후 수동 실행 검증

## 13. 성공 기준

- 로컬에서 `npm run scrape` 실행 시 `data/jobs.json`이 생성된다.
- 각 사이트별 최대 30개까지 수집을 시도한다.
- 실패한 사이트가 있어도 전체 실행은 종료되지 않고 에러 로그를 남긴다.
- GitHub Actions 수동 실행으로 `jobs.json`이 커밋된다.
- Routines가 `docs/index.html`을 생성/커밋한다.
- GitHub Pages에서 적합도 내림차순 대시보드를 볼 수 있다.

## 14. 운영 주의사항

- 각 사이트의 구조 변경에 대비해 scraper는 방어적으로 작성한다.
- 스크래핑 속도는 보수적으로 유지한다.
- 로그인/캡차/비공개 API 우회는 하지 않는다.
- 공고 URL과 요약 중심으로 저장하고 원문 전체 복제는 피한다.
- 비공개 고객사 프로젝트명/URL/상세 기능은 대시보드에 노출하지 않는다.
