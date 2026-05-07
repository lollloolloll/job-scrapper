# job-scraper

사람인, 원티드, 잡코리아의 주니어 웹개발/프론트엔드 채용공고를 자동 수집하고, Claude Code Routines로 사용자 맞춤 분석 대시보드를 생성하는 시스템입니다. 자세한 요구사항은 [`PRD.md`](./PRD.md)에 있습니다.

## 사용자 맞춤 분석 기준

> 실제 운영 문제를 웹 시스템으로 바꿔본 경험이 있는 Next.js/React 기반 주니어 웹 개발자.

분석에서 우선 반영할 사용자 경험:

- 소상상점: Next.js/React/TypeScript, Storybook, API/OAuth, SEO/배포, GitHub 협업
- 쌍청문 공간대여 예약 시스템: Next.js/Supabase 기반 예약/관리자/정책/migration
- 쌍청문 키오스크/대여 관리 시스템: Next.js/Drizzle/SQLite/Docker/PWA
- 웹에이전시/MVP 준비: 랜딩, 상담/문의, 고객 요구사항 정리
- AI-native workflow: 보조 강점

## 디렉토리 구조

```
job-scraper/
├── PRD.md
├── scrapers/{saramin,wanted,jobkorea}.js
├── scripts/run-all.js
├── src/{config.js,scrape-utils.js}
├── docs/index.html
├── data/jobs.json
└── .github/workflows/scrape.yml
```

## 설치

```bash
npm install
npm run install:browsers
```

## 실행

```bash
npm run scrape              # 3개 사이트 통합 수집 → data/jobs.json
npm run generate:html       # data/jobs.json → docs/index.html 대시보드 생성
npm run validate:dashboard  # 생성된 대시보드 핵심 UI/메타데이터 검증
npm run scrape:saramin      # 단독 실행 (stdout으로 JSON)
npm run scrape:wanted
npm run scrape:jobkorea
npm run check               # 모든 스크립트 syntax 검증
```

각 사이트 실패는 격리되어 한 사이트가 죽어도 나머지는 진행됩니다.

## 설정

검색 조건과 사용자 프로필 키워드는 [`src/config.js`](./src/config.js)에서 수정합니다. 사이트별 search URL은 각 scraper 상단의 `buildSearchUrl()`에서 조정합니다.

## GitHub Actions

`.github/workflows/scrape.yml`은 매일 06:00 KST 자동 실행 + 수동(`workflow_dispatch`) 실행을 지원합니다. 흐름:

1. 의존성 설치 + Playwright Chromium 설치
2. `npm run scrape` 실행
3. `data/jobs.json` 변경 시 자동 commit/push
4. 변경이 있을 때만 Claude Code Routines 엔드포인트로 POST 트리거

필요한 GitHub Secrets:

- `ROUTINE_ENDPOINT`
- `ROUTINE_TOKEN`

미설정 시 트리거 단계는 건너뛰며 워크플로우는 성공 종료합니다.

## Claude Code Routines

Routines는 `data/jobs.json`을 읽어 PRD §10 프롬프트 기준으로 `docs/index.html`을 생성/커밋합니다. 점수 기준·분석 항목·UI 요구사항은 [`PRD.md`](./PRD.md)를 단일 출처로 봅니다.

## 운영 주의사항

- 사이트 약관 우회·로그인/캡차 우회·유료 API 우회를 하지 않습니다.
- scraper는 사이트 구조 변경에 방어적으로 동작하며 (다중 셀렉터 fallback) 실패 시에도 빈 배열을 반환합니다.
- 비공개 고객사 정보는 대시보드/저장소에 노출하지 않습니다.
