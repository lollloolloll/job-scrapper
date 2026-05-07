---
type: summary
date: 2026-05-02
status: draft
confidence: medium-high
tags:
  - 소상상점
  - resume
  - ai-log
  - learning
  - frontend
  - collaboration
source_paths:
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
  - /host/users/skdhu/.cursor-tutor/small-shop_project
---

# 소상상점 AI 질문/학습 패턴 요약

> 세부 주제별 deep index는 [[sosangsangjeom/README|소상상점 Deep Index]]에서 관리한다. 앞으로 소상상점 관련 질문은 이 요약을 1차로 읽고, 세부 질문은 Git/API/UI/배포/사업/면접 노트만 선택적으로 읽는다.

## 결론

소상상점은 단순한 사이드 프로젝트라기보다, 약 8개월 가까이 꾸준히 작업하며 개발·협업·기획·운영을 함께 배운 장기 프로젝트로 보는 것이 맞다.

AI 로그 기준으로 사용자는 주로 “코드를 대신 짜달라”보다 다음을 많이 물어봤다.

1. 오류 로그를 해석하고 원인을 찾는 법
2. Git/GitHub 협업 흐름을 이해하는 법
3. Next.js/React/TypeScript 구조를 이해하는 법
4. API/Swagger/인증/토큰 연동 개념을 이해하는 법
5. UI 컴포넌트와 Storybook을 구성하고 디버깅하는 법
6. 배포/빌드/SEO/운영에서 생기는 문제를 해석하는 법
7. PR 메시지, 회의/리뷰/피드백 커뮤니케이션을 다듬는 법
8. 소상공인 협업 플랫폼이라는 서비스 자체의 사업성, 고객 확보, 영업 접근법을 고민하는 법

즉, 이 프로젝트에서 배운 핵심은 “Next.js 화면 구현”만이 아니라, 실제 팀 프로젝트에서 프론트엔드 개발자가 겪는 거의 전 과정이다.

---

## 근거 규모

현재 확인한 근거:

- ChatGPT export에서 소상상점/sosangsangjeom/smallbiz 관련 대화: 약 100개 conversation 후보
- Claude export에서 관련 대화: 약 39개 conversation 후보
- `/host/users/skdhu/.cursor-tutor/sosangsangjeom-client` git log:
  - 커밋 범위: 2024-11-27 ~ 2025-12-24
  - 전체 커밋 수: 2080개
  - 월별 커밋 집중 구간: 2025-03 ~ 2025-08, 특히 2025-05/06/08이 많음

주의: git log의 2080개는 팀 전체/브랜치 병합 이력이 섞여 있을 수 있으므로 “내가 2080개를 직접 커밋했다”로 쓰면 안 된다. 다만 프로젝트가 장기간 활발히 진행됐다는 근거로는 강하다.

---

## AI에게 많이 물어본 주제

### 1. Git/GitHub 협업

자주 나온 질문/상황:

- `git push origin feature/...` 권한 오류
- GitHub repository write access 문제
- `git pull develop`처럼 remote/branch 개념이 섞인 명령 오류
- branch checkout, merge, cherry-pick, reset, rebase
- develop 브랜치와 feature 브랜치 차이
- PR 작성, PR 메시지, 리뷰 요청 문구
- conflict를 고려한 작업 순서
- hotfix 브랜치 생성 후 build error 해결 PR

배운 점:

- Git에서 remote와 branch는 다르다.
- `origin/develop`, `develop`, `feature/...`의 관계를 이해해야 협업이 가능하다.
- merge/cherry-pick/reset/rebase는 단순 명령어가 아니라 작업 이력과 협업 흐름을 관리하는 도구다.
- PR은 코드 제출만이 아니라 팀원에게 “무엇을 왜 바꿨는지” 설명하는 커뮤니케이션이다.

이력서/면접 표현:

- GitHub Flow 기반 협업 과정에서 feature/hotfix 브랜치, PR, merge conflict, build error 대응을 경험했다.
- 단순 기능 구현뿐 아니라 PR 설명과 리뷰 요청 메시지를 정리하며 팀 협업 커뮤니케이션을 개선했다.

---

### 2. Next.js / React / TypeScript 구조 이해

자주 나온 질문/상황:

- Next.js App Router의 page, route, params, searchParams
- client component/server component 구분
- TypeScript 타입 불일치
- `Type 'string[]' is not assignable to type 'string'`
- dynamic route params 관련 오류
- SVG import 타입 오류
- React Fragment, props 타입, 컴포넌트 분리
- `useEffect`, loading 상태, rendering 흐름

배운 점:

- Next.js는 단순 React보다 라우팅, 서버/클라이언트 컴포넌트, 빌드 단계의 타입 제약이 중요하다.
- TypeScript 오류는 대부분 “데이터 형태와 컴포넌트가 기대하는 props 형태가 다르다”는 신호다.
- 화면이 안 뜨는 문제는 UI 문제가 아니라 타입, 라우팅, 데이터 로딩, 빌드 조건 문제일 수 있다.

이력서/면접 표현:

- Next.js App Router 환경에서 동적 라우팅, client/server component, 타입 안정성을 고려해 페이지를 구현했다.
- TypeScript 타입 오류와 props 구조 불일치를 디버깅하며 컴포넌트 인터페이스를 정리했다.

---

### 3. API / Swagger / 인증 / 데이터 연동

자주 나온 질문/상황:

- Swagger URL과 실제 API endpoint 차이
- `https://api.smallbiz.co.kr/api-docs#...`가 실제 요청 URL인지 질문
- Axios baseURL 설정
- request interceptor에서 Authorization Bearer token 설정
- access token이 없을 때 header에 `undefined`가 들어가는 문제
- OAuth redirect URI/callback URL
- Kakao/Naver 로그인 관련 설정
- API payload/response 구조 확인
- 협업 관련 API 연결

배운 점:

- Swagger 문서 URL과 실제 API endpoint는 다르다.
- 프론트엔드 API client는 baseURL, endpoint, header, token, error handling을 분리해서 관리해야 한다.
- 인증 문제는 코드만의 문제가 아니라 OAuth provider 설정, redirect URI, 환경변수, 배포 도메인까지 이어진다.
- API 연동은 화면 완성 이후 붙이는 작업이 아니라 데이터 모델과 컴포넌트 구조를 함께 맞춰야 하는 작업이다.

이력서/면접 표현:

- Swagger 문서를 기반으로 실제 API endpoint를 식별하고 Axios client/interceptor를 구성해 인증 토큰 기반 API 요청 구조를 정리했다.
- OAuth redirect URI, callback URL, 환경변수 차이를 점검하며 소셜 로그인 연동 문제를 디버깅했다.

---

### 4. UI 컴포넌트 / Storybook / 디자인 시스템

자주 나온 질문/상황:

- ProjectCard, ChipList, Dropdown, Header, Avatar, Button 등 컴포넌트 관련 오류
- Storybook 실행/설정 오류
- story 파일 경로, import alias, `Module not found` 문제
- Tailwind CSS 정렬/간격/반응형
- Figma와 행간/폰트/레이아웃 동기화
- 지도 페이지/상점 상세/채팅 페이지 UI
- 360px~480px 모바일 대응

배운 점:

- 컴포넌트는 “보이는 UI”뿐 아니라 props 타입, import 경로, story 문서화, 반응형 규칙까지 포함한다.
- Storybook은 컴포넌트를 격리해서 검증하는 도구지만, alias/import/설정이 맞지 않으면 빌드 오류가 발생한다.
- 디자인 시스템을 유지하려면 폰트, 간격, 반응형 기준, variant props를 계속 정리해야 한다.

이력서/면접 표현:

- Storybook 기반으로 주요 UI 컴포넌트를 문서화하고, Tailwind CSS를 활용해 모바일 중심 반응형 레이아웃을 개선했다.
- 지도/상점 상세/채팅/협업 목록 등 핵심 화면의 컴포넌트를 분리하고 재사용 가능한 구조로 정리했다.

---

### 5. 빌드 / 패키지 / 의존성 문제

자주 나온 질문/상황:

- `npm run dev`, `npm run build`
- `Cannot find module`, `Module not found`
- `node_modules`/`package-lock.json` 삭제 후 재설치
- Next.js 내부 dependency 깨짐, acorn module 오류
- Storybook build/preview 오류
- package 취약점/audit 결과 확인
- build error 해결 PR

배운 점:

- 빌드 오류는 코드 오류, import 경로 오류, 패키지 설치 문제, lockfile 문제, 환경변수 문제로 나눠서 봐야 한다.
- `node_modules`와 lockfile을 무작정 지우기보다, 어떤 증상에서 어떤 복구 절차를 적용하는지 판단해야 한다.
- 팀 프로젝트에서는 build error를 빨리 해결하는 hotfix 흐름이 중요하다.

이력서/면접 표현:

- Next.js/Storybook 빌드 과정에서 발생한 dependency, alias, module resolution 오류를 추적하고 hotfix PR로 해결했다.

---

### 6. SEO / 배포 / 운영 / 성능

자주 나온 질문/상황:

- `sitemap.xml`, `robots.txt`가 왜 생겼는지
- `next-sitemap` postbuild 동작
- Naver site verification
- 운영 서버 반영 가능 여부
- `shop.sosangsangjeom.com` 접속/속도/CDN 의심
- Cloudflare/IP trace 관련 질문
- `.env.local`, `.env.production`, production build

배운 점:

- 프론트엔드 운영에는 SEO, sitemap, robots, 검색엔진 인증, 도메인, CDN, build 환경이 포함된다.
- 자동 생성 파일도 “왜 생겼는지” 이해하고 commit/배포 여부를 판단해야 한다.
- 운영 환경에서는 단순히 로컬에서 동작하는 것과 다른 문제가 생긴다.

이력서/면접 표현:

- Next.js 배포 과정에서 sitemap/robots, 네이버 소유권 인증, production build 환경을 점검하며 운영 반영 이슈를 처리했다.

---

### 7. 커뮤니케이션 / PR / 회의 대응

자주 나온 질문/상황:

- PR 작성 완료 메시지 다듬기
- 리뷰 부탁 메시지
- 작업 지연에 대한 표현
- 회의 전/후 피드백 반영 메시지
- 팀원에게 API 연동 진행 상황 설명
- 발표/회의 상황에서 어떻게 답장할지

배운 점:

- 개발 협업에서는 코드만큼 “상황을 어떻게 설명하는지”가 중요하다.
- PR 메시지는 작업 범위, 현재 상태, 리뷰 포인트, 남은 작업을 명확히 해야 한다.
- 일정이 늦었을 때도 변명보다 현재 상태와 다음 액션을 구조화해서 전달하는 게 좋다.

이력서/면접 표현:

- PR/리뷰/회의 상황에서 작업 범위와 이슈를 명확히 공유하며 협업 커뮤니케이션을 개선했다.

---

### 8. 서비스 기획 / 고객 확보 / 사업성 고민

자주 나온 질문/상황:

- 소상공인 협업 플랫폼의 장점/단점
- 같은 업종 상점끼리 공동 구매/협업하는 모델
- 당근/배민/놀토 등 유사 서비스와 비교
- 재무제표로 사업 수완을 볼 수 있는지
- 구청/상인회/창업지원단에 어떻게 접근할지
- 초기 고객이 없는 문제
- 소상공인 협업 글쓰기 플랫폼의 홍보/영업 전략
- NotebookLM에 소상상점 플랫폼 자료를 모아둔 흔적

배운 점:

- 기술 구현만으로 서비스가 성공하지 않는다.
- 초기 고객 확보, 상인회/구청/창업지원단 접점, 사장님들이 실제로 얻는 이익을 정의해야 한다.
- “협업 플랫폼”이라는 추상적인 말보다, 상인 입장에서 당장 얻는 매출/홍보/비용절감/공동구매/지역 노출 이득을 설명해야 한다.

이력서/면접 표현:

- 개발 과정에서 소상공인 협업 플랫폼의 실제 고객 확보 문제를 인식하고, 상인회/구청/창업지원단 등 오프라인 접점을 통한 초기 사용자 모집 전략까지 고민했다.

---

## 사용자가 실제로 성장한 방향

AI 로그를 보면 사용자의 질문은 시간이 지나면서 변했다.

초기에는:

- 이 오류가 무슨 뜻인지
- 이 명령어가 왜 안 되는지
- API URL이 뭔지
- Git push가 왜 안 되는지

중반에는:

- 브랜치를 어떻게 관리할지
- PR을 어떻게 올릴지
- 컴포넌트를 어떻게 분리할지
- API 연결 상태를 어떻게 설명할지
- build error를 어떻게 해결할지

후반에는:

- 운영 서버/SEO/사이트맵/네이버 인증
- 지도/상점 상세/모바일 UI 고도화
- 초기 사용자 모집/구청/상인회/창업지원단 접근
- 서비스 설명/포트폴리오화/브랜드 분석

즉, 단순 문법 질문에서 시작해서 실제 서비스 개발자의 시야로 확장된 흐름이 보인다.

---

## 이력서용 핵심 서사

소상상점은 이렇게 포장하는 게 좋다.

> 약 8개월간 소상공인 협업 플랫폼을 팀으로 개발하며, Next.js 기반 프론트엔드 구현뿐 아니라 GitHub 협업, API 연동, Storybook 컴포넌트 문서화, 빌드/배포 이슈 대응, SEO/운영 설정, 초기 사용자 확보 전략까지 경험한 프로젝트.

강조할 수 있는 성장 포인트:

- 국비학원식 단기 CRUD를 넘어 실제 장기 팀 프로젝트를 수행했다.
- 단순 구현보다 협업/리뷰/브랜치/PR/빌드 대응을 많이 겪었다.
- API/인증/Swagger/토큰/환경변수/운영 도메인 등 실무형 문제를 반복적으로 다뤘다.
- UI 컴포넌트와 Storybook, 모바일 반응형, 지도/채팅/상점 상세 등 사용자 화면 완성도를 높이는 작업을 했다.
- 고객이 없는 문제를 개발 밖의 문제로 인식하고 영업/기획/초기 사용자 확보까지 고민했다.

---

## 면접에서 말할 수 있는 답변 초안

### 질문: 소상상점 프로젝트에서 가장 많이 배운 것은?

소상상점은 약 8개월 가까이 작업한 소상공인 협업 플랫폼 프로젝트입니다. 처음에는 React/Next.js 화면 구현과 오류 해결에 집중했지만, 진행하면서 Git 브랜치 전략, PR 리뷰, Swagger 기반 API 연동, 인증 토큰 처리, Storybook 컴포넌트 문서화, Next.js 빌드/배포와 SEO 설정까지 경험했습니다. 특히 실제 서비스처럼 운영 도메인, sitemap, 네이버 소유권 인증, 초기 사용자 확보 문제까지 고민하면서, 프론트엔드 개발이 단순히 화면을 만드는 일이 아니라 서비스가 돌아가게 만드는 전 과정과 연결된다는 걸 배웠습니다.

### 질문: 가장 어려웠던 문제는?

가장 어려웠던 건 특정 하나의 버그보다, 팀 프로젝트에서 여러 문제가 동시에 얽히는 상황이었습니다. 예를 들어 API 연동 중에는 Swagger 문서 URL과 실제 endpoint를 구분해야 했고, 인증 토큰을 Axios interceptor에 어떻게 넣을지, response 타입과 컴포넌트 props 타입을 어떻게 맞출지 계속 확인해야 했습니다. 또 이 과정에서 build error나 branch conflict가 생기면 hotfix 브랜치를 만들어 우선 해결하고 PR로 공유해야 했습니다. 이 경험을 통해 오류 로그를 그대로 복사하는 수준을 넘어, 문제를 API/타입/UI/빌드/협업 흐름으로 나눠서 보는 습관을 배웠습니다.

### 질문: AI는 어떻게 활용했나?

AI는 코드를 무조건 대신 작성시키는 도구라기보다, 오류 로그를 해석하고 개념을 이해하고 협업 메시지를 정리하는 러버덕처럼 사용했습니다. 예를 들어 TypeScript 타입 오류, Next.js 라우팅 문제, Swagger endpoint 구분, Git 명령 오류, Storybook module resolution 오류를 만났을 때 먼저 로그와 상황을 전달하고 원인 후보를 정리했습니다. 그 과정에서 제가 몰랐던 개념을 반복적으로 학습했고, PR 메시지나 리뷰 요청 문구도 AI로 다듬으면서 팀 커뮤니케이션 품질을 높였습니다.

---

## 주의할 점

- 민감한 토큰/Authorization 값이 raw log에 일부 포함되어 있었으므로, 이력서/포트폴리오 문서에는 절대 포함하지 않는다.
- git log의 전체 커밋 수는 팀/브랜치 이력이 섞여 있으므로 개인 기여 수치로 직접 쓰지 않는다.
- “AI 도움 없이 코딩하려니까 죽을맛” 같은 원문은 인간적인 흔적이지만 이력서에는 쓰지 않는다. 대신 “AI를 오류 분석/학습/협업 정리에 활용” 정도로 정리한다.
