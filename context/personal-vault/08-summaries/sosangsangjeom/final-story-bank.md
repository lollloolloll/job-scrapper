---
type: summary
date: 2026-05-04
status: active
confidence: medium-high
tags: [소상상점, resume, interview, story-bank, evidence]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/sosangsangjeom/README.md
  - /workspace/_memory/Obsidian Vault/08-summaries/ai-log-index/targeted-raw-drilldown-summaries.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/.git
---

# 소상상점 이력서/면접 최종 Story Bank

## 최종 포지셔닝

소상상점은 **약 8개월 이상 이어진 소상공인 협업/상점 플랫폼 프론트엔드 프로젝트**로 포장하는 것이 가장 안전하다. 단순 CRUD나 토이 프로젝트가 아니라, 실제 팀 저장소와 AI 로그 기준으로 다음 경험이 함께 확인된다.

- Next.js/React/TypeScript 기반 사용자 웹 구현
- 상점/그룹 상점/협업/채팅/지도/온보딩/인증 화면 구성
- Axios API client, OAuth callback, token store, API module 분리
- Storybook 기반 UI 컴포넌트 문서화와 버전/빌드 이슈 해결
- Vercel/Storybook/next-sitemap/robots/검색봇 middleware 등 배포·SEO 운영 경험
- GitHub feature/fix/hotfix branch, PR template, merge/rollback 등 팀 협업 흐름 경험
- 소상공인/골목형상점가/영업 멘트/상인회·조합 관점에 대한 서비스 기획 고민

## 최종 한 줄 소개

> 소상공인 협업 플랫폼 ‘소상상점’에서 Next.js 기반 프론트엔드 개발을 담당하며, 상점/협업/채팅/지도 UI 구현, Storybook 컴포넌트 문서화, API·OAuth 연동, 배포·SEO 이슈 대응, GitHub PR 협업까지 경험했습니다.

## 이력서용 프로젝트 설명

- **프로젝트명**: 소상상점 — 소상공인 협업/상점 플랫폼
- **기간 표현**: 약 8개월 이상. 단, 최종 이력서에는 정확한 시작/종료 월 확인 필요.
- **역할 표현**: 프론트엔드 개발 중심 + API 연동 + UI 문서화 + 배포/SEO 대응 + 협업 커뮤니케이션.
- **핵심 스택**: Next.js 15, React 18, TypeScript, Tailwind CSS, Zustand, Axios, Storybook, Chromatic, next-sitemap, Dockerfile/standalone build, Vercel.
- **팀/협업 근거**: Git remote `sosangsangjeom-official/sosangsangjeom-client`, 다수 원격 branch, PR merge commit, PR template 존재.

## 검증된 evidence 요약

### 저장소/코드 근거

- `package.json` name: `smallbiz-shop-client`
- scripts: `build`, `build:prod`, `storybook`, `build-storybook`, `postbuild: next-sitemap`
- Storybook story 파일 다수: `src/stories/*.stories.tsx` 계열
- API client: `src/shared/api/index.ts`, `src/entities/*/api/*`
- OAuth callback: `src/app/(auth)/callback/page.tsx`
- auth store: `src/entities/auth/model/authStore.ts`
- SEO/sitemap: `next-sitemap.config.js`, `src/middleware.ts`
- 배포/운영: `Dockerfile`, `next.config.ts` `output: "standalone"`, `vercel.json`
- PR 협업: `.github/pull_request_template.md`
- branch evidence: `feature/connect-store-api`, `feat/auth-token-interceptor`, `hotfix/debug-build-error`, `feature/naver-map`, `refactor/collaboration-page` 등

### Git 근거

- remote: `https://github.com/sosangsangjeom-official/sosangsangjeom-client`
- 전체 이력 범위: `2024-11-27` 이후 확인
- author count: `skdhu` 커밋 1223개 확인. 단, 이 수치는 로컬 git shortlog 기준이며 최종 이력서에는 “개인 커밋 수”로 쓰기 전 검증 필요.
- 최근 본인 commit 예시:
  - `2025-12-05 feat: storybook 최신화`
  - `2025-11-18 chore: 네이버 소유권인증`
  - `2025-11-16 chore: build error 수정`
  - `2025-11-09 fix(sitemap): update lastmod timestamps...`
  - `2025-10-01 feat(스토리북 업데이트): @storybook/react에서 @storybook/nextjs로의 마이그레이션...`

## STAR 스토리 1 — API/OAuth 인증 연동

### Situation

소상상점은 OAuth 로그인, token 저장, API 요청, 배포 도메인/환경변수 설정이 함께 맞아야 하는 구조였다. AI 로그에서는 OAuth callback URL, Kakao OAuth 환경변수, token store, Axios client 관련 질문이 반복적으로 확인된다.

### Task

프론트엔드에서 로그인 callback 이후 access token을 안전하게 저장하고, API 요청에서 필요한 경우 인증 정보를 붙이며, dev/main/Vercel/Supabase/Kakao 설정 차이를 이해해야 했다.

### Action

- `src/app/(auth)/callback/page.tsx`에서 OAuth callback 처리 흐름 확인
- `src/entities/auth/model/authStore.ts`에서 access token 저장 구조 확인
- `src/shared/api/index.ts`에서 Axios baseURL/interceptor 구조 확인
- `src/entities/*/api/*`로 도메인별 API 모듈 분리
- raw drill-down에서 `OAuth 콜백 URL 설정`, `Kakao OAuth 콜백 URL 환경변수 설정 방식` 대화 본문 확인

### Result

이 스토리는 “로그인 붙였습니다”보다 **인증은 코드·provider 설정·redirect URI·배포 환경이 동시에 맞아야 한다는 것을 경험했다**로 말하는 것이 좋다.

### 면접 답변 문장

> OAuth 연동을 하면서 프론트 코드만 맞는다고 끝나는 게 아니라는 걸 배웠습니다. callback page에서 인가 결과를 받고, token store와 Axios interceptor를 연결하고, dev/main 브랜치나 Vercel preview 환경에 따라 provider의 redirect URL도 맞춰야 했습니다. 그래서 API 연동을 화면 단위가 아니라 인증 흐름과 배포 환경까지 포함한 구조로 이해하게 됐습니다.

## STAR 스토리 2 — Storybook/UI 컴포넌트 문서화

### Situation

상점 카드, 채팅 메시지, 배너, 버튼, 드롭다운, 온보딩/협업 화면 등 UI 단위가 많아지면서 페이지 안에서만 확인하면 재사용성과 디자인 일관성을 유지하기 어려웠다.

### Task

컴포넌트를 Storybook에서 독립적으로 확인하고, Next.js/React 버전과 addon 충돌, router/mock, SVG webpack 설정 문제를 해결해야 했다.

### Action

- `src/stories/*.stories.tsx` 다수 확인
- `.storybook/main.ts`에서 `@storybook/nextjs`, `@chromatic-com/storybook`, `@storybook/addon-docs`, SVG webpack 설정 확인
- raw drill-down에서 `스토리북 배포 설정`, `Storybook button component story`, `Storybook decorator placement`, `Storybook thumbnail component configuration` 흐름 확인
- git log에서 Storybook 관련 커밋 확인: `@storybook/nextjs` migration, addon/router 개선, storybook 최신화

### Result

Storybook을 “예쁜 컴포넌트 전시장”이 아니라 **팀이 UI 단위를 독립적으로 검증하고 공유하는 협업 도구**로 경험했다고 말할 수 있다.

### 면접 답변 문장

> Storybook을 쓰면서 컴포넌트를 페이지에서 떼어내 독립적으로 검증하는 흐름을 배웠습니다. 특히 Next.js 환경에서는 router, image, svg, addon 버전 문제가 같이 생겨서 단순 story 작성뿐 아니라 빌드 환경과 webpack 설정까지 확인해야 했습니다. 결과적으로 버튼/카드/채팅/상점 UI를 재사용 가능한 단위로 관리하는 감각을 익혔습니다.

## STAR 스토리 3 — 배포/SEO/검색봇 대응

### Situation

서비스를 배포하고 검색 노출을 고려하면서 sitemap, robots, 검색엔진 소유권 인증, 온보딩 redirect, 검색봇 접근 문제가 생겼다.

### Task

일반 사용자는 온보딩으로 보내되, Google/Naver/Daum 등 검색봇은 온보딩 redirect에 막히지 않게 하고, sitemap/robots를 생성해야 했다.

### Action

- `next-sitemap.config.js`에서 `siteUrl`, `generateRobotsTxt`, 동적 `additionalPaths` 확인
- `src/middleware.ts`에서 검색봇 user-agent는 온보딩 redirect를 비활성화하도록 처리한 근거 확인
- `next.config.ts`에서 standalone output과 이미지 remotePatterns 확인
- git log에서 `chore: 네이버 소유권인증`, `fix(sitemap)`, `feat(middleware): 로봇이 온보딩 페이지 못 가게 설정`, `build error 수정` 확인
- raw drill-down에서 `Vercel 호스팅 방법`, `서버컴포넌트 배포 환경`, `네이버 SEO 작업 방법` 후보 확인

### Result

이 스토리는 “Vercel에 올렸다”보다 **프론트엔드 운영에서 routing, middleware, sitemap, 검색봇, 빌드 환경이 연결된다**는 경험으로 말하는 것이 좋다.

### 면접 답변 문장

> 배포 이후에는 단순히 페이지가 열리는지뿐 아니라 검색봇이 어떤 경로를 보는지도 중요했습니다. 온보딩 redirect가 일반 사용자에게는 필요하지만 검색봇에게는 SEO를 막을 수 있어서 middleware에서 user-agent를 구분했습니다. next-sitemap으로 robots와 sitemap을 생성하고, 네이버 소유권 인증과 sitemap lastmod 수정까지 하면서 운영 관점의 프론트엔드 문제를 경험했습니다.

## STAR 스토리 4 — GitHub 협업/되돌리기/PR 흐름

### Situation

팀 저장소에는 `develop`, `main`, feature/fix/hotfix branch가 있고 PR merge commit이 많았다. 개발 중 build error, Storybook migration, API 연동, UI 수정 등이 병렬로 진행됐다.

### Task

작업 branch를 나누고, PR 설명을 작성하고, 문제가 생기면 reset/revert/checkout 등 되돌리기 전략을 이해해야 했다.

### Action

- remote branch 확인: `feature/UI-components`, `feat/connect-onboarding`, `feature/naver-map`, `hotfix/debug-build-error`, `fix/qa-found-issues` 등
- `.github/pull_request_template.md`로 작업 내역/스크린샷/참고 링크를 기록하는 흐름 확인
- raw drill-down에서 `Git 되돌리기 방법`, `Gitignore .env.production`, build error 관련 대화 확인
- merge commit과 본인 commit이 섞여 있음을 구분해 개인 성과 수치 과장 방지

### Result

협업 경험은 “Git 써봤다”가 아니라 **branch 전략, PR 커뮤니케이션, 되돌리기 판단, build error 대응을 경험했다**로 표현한다.

### 면접 답변 문장

> 이 프로젝트에서는 develop/main과 feature/fix/hotfix branch를 나눠 작업했습니다. PR template에 작업 내역과 참고 링크를 정리했고, Storybook이나 build 설정 변경처럼 영향 범위가 큰 작업은 되돌리기 방법까지 확인하며 진행했습니다. Git 명령 자체보다 협업 이력과 배포 안정성을 관리하는 도구로 Git을 이해하게 됐습니다.

## STAR 스토리 5 — 서비스 기획/소상공인 도메인 이해

### Situation

소상상점은 단순 기술 프로젝트가 아니라 소상공인 협업, 골목형상점가, 상인회/조합, 영업 멘트 등 실제 도메인 이해가 필요한 서비스였다.

### Task

소상공인의 문제를 어떻게 바라볼지, 상인회/조합과 협업·마케팅이 어떤 위치인지, 영업 활동에서 어떤 신뢰 문제가 생기는지 정리해야 했다.

### Action

- raw drill-down에서 `골목형상점가 설명`, `소상공인 영업활동 회의록`, `소상공인 협업 분석`, `영업용 멘트 다듬기` 본문 확인
- 기술 기능을 “상점 목록/협업 UI”로만 보지 않고, 소상공인 협업 패키지/상권 활성화/영업 신뢰성 문제와 연결
- 단, 실제 상인 접촉 결과/기관 협업 여부는 사용자 확인 전까지 claim으로 확정하지 않음

### Result

이 스토리는 **프론트엔드 개발자가 도메인/사용자 문제를 이해하려고 노력했다**는 강점으로 쓸 수 있다.

### 면접 답변 문장

> 소상상점은 단순히 화면을 만드는 프로젝트가 아니라 소상공인 협업이 왜 필요한지 이해해야 했습니다. 골목형상점가, 상인회/조합, 영업 신뢰성 문제를 정리하면서 기능을 만드는 이유를 같이 고민했습니다. 그래서 UI 구현을 할 때도 상점 정보, 협업 제안, 채팅, 지도 같은 기능이 실제 사용자 문제와 어떻게 연결되는지 생각하게 됐습니다.

## 최종 이력서 bullet 후보

### 안전한 버전

- Next.js/React/TypeScript 기반 소상공인 협업 플랫폼에서 온보딩, 상점/그룹상점, 협업, 채팅, 지도 UI를 구현하고 API 연동 구조를 경험했습니다.
- Storybook을 활용해 버튼, 카드, 채팅, 상점 UI 등 재사용 컴포넌트를 문서화하고, Next.js 환경의 addon/SVG/router 설정 문제를 해결했습니다.
- Axios client와 OAuth callback/token store 구조를 확인하며 인증 API 연동과 배포 환경별 redirect URL 설정 문제를 학습·대응했습니다.
- next-sitemap, robots, middleware 검색봇 예외 처리, 네이버 소유권 인증 등 프론트엔드 배포·SEO 운영 이슈를 경험했습니다.
- GitHub feature/fix/hotfix branch와 PR template 기반 협업 흐름에서 build error, Storybook migration, UI/SEO 수정 작업을 진행했습니다.

### 공격적인 버전 — 사용자 확인 후 사용

- 약 8개월간 운영된 팀 프로젝트에서 `skdhu` author 기준 1,000건 이상의 커밋 흔적이 확인되며, UI 컴포넌트·API 연동·SEO/배포 개선 작업을 지속적으로 수행했습니다.
- 소상공인 영업/상권 협업 전략까지 검토하며 개발 기능을 실제 서비스 운영·고객 확보 관점과 연결했습니다.

## 아직 사용자 확인이 필요한 것

- 정확한 프로젝트 기간과 팀 규모
- 실제 배포 URL/Storybook URL 공개 가능 여부
- 본인이 직접 담당한 endpoint/화면/PR 범위
- 실제 사용자/상인/기관 접촉 여부와 결과
- 최종 서비스 성과 지표: 사용자 수, 방문 수, PR 수, 컴포넌트 수, 배포 횟수 등
