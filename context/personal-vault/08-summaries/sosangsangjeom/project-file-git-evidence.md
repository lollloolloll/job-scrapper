---
type: summary
date: 2026-05-04
status: active
confidence: medium-high
tags: [소상상점, evidence, project-files, resume]
source_paths:
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/package.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/next-sitemap.config.js
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/src/middleware.ts
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/.storybook/main.ts
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/.github/pull_request_template.md
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client/.git
---

# 소상상점 Project File / Git Evidence 강화

## 목적

소상상점 이력서 claim을 AI 로그 기반 추정에서 실제 프로젝트 파일/README/git evidence 기반으로 강화한다.

## 저장소 식별

- 경로: `/host/users/skdhu/.cursor-tutor/sosangsangjeom-client`
- remote: `https://github.com/sosangsangjeom-official/sosangsangjeom-client`
- package name: `smallbiz-shop-client`
- README: 기본 Next.js template 수준이라, 이력서 근거는 README보다 코드 구조/package/git log를 우선한다.

## 기술 스택 evidence

`package.json` 기준:

- Next.js `15.0.3`
- React `18.3.1`
- TypeScript `^5`
- Tailwind CSS `^3.4.17`
- Zustand `^5.0.3`
- Axios `^1.7.9`
- Storybook `^9.1.9`
- `@storybook/nextjs`, `@chromatic-com/storybook`, `@storybook/addon-docs`
- `next-sitemap`, `framer-motion`, `swiper`, `zod`

scripts 기준:

- `build`, `build:prod`
- `storybook`, `build-storybook`
- `postbuild: next-sitemap`

## 기능/구조 evidence

### 화면/라우트

- `src/app/onboarding/page.tsx`
- `src/app/home/page.tsx`
- `src/app/map/page.tsx`
- `src/app/chat/page.tsx`, `src/app/chat/[chatId]/page.tsx`
- `src/app/collaborations/page.tsx`
- `src/app/store/layout.tsx`
- `src/app/(auth)/login/page.tsx`, `src/app/(auth)/callback/page.tsx`, `src/app/(auth)/signup/page.tsx`

### API 모듈

- `src/shared/api/index.ts`: Axios instance, baseURL, request interceptor 구조
- `src/entities/auth/api/authApi.ts`
- `src/entities/collaboration/api/collaborationApi.ts`
- `src/entities/group-stores/api/group-storesApi.ts`
- `src/entities/store/api/storeApi.ts`
- `src/entities/user/api/userApi.ts`
- `src/entities/notification/api/notificationApi.ts`
- `src/shared/api/uploadApi.ts`

### Storybook/UI

- `.storybook/main.ts`: `@storybook/nextjs`, docs addon, Chromatic addon, SVG webpack 설정
- `src/stories/*.stories.tsx`: AlertBox, Avatar, Badge, Banner, Button, ChatRoom, Collaboration, Dropdown, GroupStore, Header, Home, ImageUploader, Navbar, Pagination, Search, Store 등 다수 컴포넌트 story 확인

### SEO/배포/운영

- `next-sitemap.config.js`: `siteUrl`, `generateRobotsTxt`, dynamic `additionalPaths` 설정
- `src/middleware.ts`: 검색봇 user-agent는 온보딩 redirect 예외 처리
- `next.config.ts`: `output: "standalone"`, image `remotePatterns`, SVG webpack 설정
- `Dockerfile`: Next.js standalone output 기반 production image 구성
- `vercel.json`: Vercel 배포 설정 후보

## Git/협업 evidence

### branch 구조

원격 branch 후보:

- `origin/develop`, `origin/main`
- `origin/feat/auth-token-interceptor`
- `origin/feat/connect-onboarding`
- `origin/feature/connect-store-api`
- `origin/feature/naver-map`
- `origin/hotfix/debug-build-error`
- `origin/refactor/collaboration-page`
- `origin/fix/qa-found-issues`

### PR evidence

- `.github/pull_request_template.md`에 작업 내역/스크린샷/참고 링크 항목 존재
- git log에 다수 `Merge pull request #...` 기록 존재

### 본인 commit evidence 후보

- `2025-12-05 feat: storybook 최신화`
- `2025-11-18 chore: 네이버 소유권인증`
- `2025-11-16 chore: build error 수정`
- `2025-11-09 fix(sitemap): update lastmod timestamps for URLs and adjust marker anchor point in MapPage`
- `2025-10-01 feat(스토리북 업데이트): @storybook/react에서 @storybook/nextjs로의 마이그레이션 및 관련 패키지 버전 업데이트`
- `2025-09-19 feat(스토리북): storybook-addon-next-router 제거 및 라우터 사용 개선`
- `2025-09-17 feat(스토리북): @storybook/nextjs 버전 8.6.14로 업데이트`

## 강화된 claim 판단표

| claim | evidence | 이력서 표현 가능성 |
|---|---|---|
| Next.js 기반 사용자 웹 구현 | `package.json`, `src/app/*`, `src/entities/*` | 높음 |
| Storybook 컴포넌트 문서화 | `src/stories/*`, `.storybook/main.ts`, storybook 관련 commit | 높음 |
| API/OAuth 연동 경험 | `src/shared/api/index.ts`, `src/app/(auth)/callback/page.tsx`, auth/API modules, raw OAuth 대화 | 중상 |
| 배포/SEO 운영 대응 | `next-sitemap.config.js`, `src/middleware.ts`, 네이버/SEO/sitemap commit | 높음 |
| GitHub PR 협업 | remote branch, PR template, merge commit | 높음 |
| 실제 사용자/상인 영업 성과 | raw 회의록/영업 대화는 있으나 결과 확인 필요 | 보류 |
| 정량 성과 | commit 수/Storybook 파일 수는 후보이나 최종 수치 검증 필요 | 보류 |

## 다음에 더 확인하면 좋은 evidence

- GitHub PR 페이지 접근 가능 여부와 본인이 작성한 PR 번호
- Storybook/Chromatic 배포 URL 존재 여부
- 실제 서비스 URL과 배포 이력
- 소상공인/상인회/기관 접촉 결과
- 본인이 직접 담당한 화면/endpoint/PR 목록
