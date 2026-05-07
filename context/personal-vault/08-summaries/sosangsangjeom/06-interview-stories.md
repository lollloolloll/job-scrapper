---
type: summary
date: 2026-05-02
status: draft
confidence: medium-high
tags: [소상상점, interview, resume, portfolio, story, ai-log]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/sosangsangjeom-ai-learning-summary.md
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
---

# 소상상점 Deep Index 06 — 이력서/면접 스토리

## 핵심 포지셔닝

소상상점은 사용자의 이력서에서 가장 중요한 장기 프로젝트로 둘 수 있다. 단기 CRUD 프로젝트가 아니라 약 8개월 가까이 이어진 소상공인 협업 플랫폼이며, AI 로그와 프로젝트 근거상 프론트엔드 구현, Git 협업, API/인증 연동, Storybook UI 문서화, 빌드/배포/SEO, 서비스 기획/고객 확보 고민까지 연결된다.

## 한 줄 소개

> 약 8개월간 소상공인 협업 플랫폼을 팀으로 개발하며, Next.js 기반 프론트엔드 구현뿐 아니라 GitHub 협업, API 연동, Storybook 컴포넌트 문서화, 빌드/배포 이슈 대응, SEO/운영 설정, 초기 사용자 확보 전략까지 경험한 프로젝트.

## 이력서 프로젝트 설명 초안

### 프로젝트명

소상상점 — 소상공인 협업/상점 플랫폼

### 기간

약 8개월 내외로 표현 가능. 단, 정확한 시작/종료 월은 사용자 확인 후 확정한다.

### 역할

프론트엔드 개발 중심. 단, GitHub 협업, API 연동, UI 컴포넌트 문서화, 운영/SEO 설정, 서비스 기획 보조 경험까지 포함.

### 기술 스택

- Next.js / React / TypeScript
- Tailwind CSS
- Storybook
- Axios
- Zustand 또는 상태관리 도구
- next-sitemap
- Git/GitHub PR 협업

### 주요 기능/영역

- 인증/온보딩 화면
- 상점/그룹 상점 목록 및 상세 UI
- 지도 기반 상점 UI
- 채팅 UI
- 재사용 UI 컴포넌트와 Storybook 문서화
- Swagger 기반 API 연동
- sitemap/robots/검색엔진 인증 등 운영 설정

## 문제 해결 스토리 1 — API/인증 연동

### 상황

Swagger 문서, 실제 endpoint, Axios baseURL, Authorization token, OAuth redirect URI가 섞이면서 API 연동과 인증 처리가 복잡했다.

### 행동

- Swagger 문서 URL과 실제 요청 endpoint를 분리해 이해
- Axios client/interceptor 구조를 정리
- access token 누락 시 Authorization header가 잘못 구성되는 케이스 확인
- OAuth redirect URI/callback URL과 배포 도메인/환경변수 차이를 점검

### 결과/학습

API 연동은 화면에서 데이터를 호출하는 작업을 넘어, 인증 흐름과 배포 환경까지 함께 맞춰야 한다는 것을 배웠다.

### 면접 답변 문장

> API 연동에서는 Swagger 문서와 실제 endpoint를 구분하는 것부터 시작했습니다. Axios baseURL과 interceptor를 정리하고, token이 없을 때 header가 잘못 들어가는 문제를 확인했습니다. OAuth 로그인은 프론트 코드뿐 아니라 provider 설정, redirect URI, 운영 도메인이 모두 맞아야 한다는 점을 경험했습니다.

## 문제 해결 스토리 2 — Storybook/UI 컴포넌트

### 상황

상점 카드, 채팅 메시지, 드롭다운, 헤더, 버튼 등 UI 컴포넌트가 늘어나면서 디자인 일관성과 재사용성이 중요해졌다.

### 행동

- 컴포넌트를 기능/화면 단위로 분리
- Storybook story를 작성해 독립적으로 확인
- import alias/module not found 오류를 해결
- Tailwind로 모바일 반응형과 Figma 기준 간격/폰트를 조정

### 결과/학습

UI 컴포넌트는 단순 화면 조각이 아니라 props 타입, 디자인 규칙, 문서화까지 포함한 협업 단위라는 것을 배웠다.

### 면접 답변 문장

> Storybook을 쓰면서 컴포넌트를 페이지와 분리해 검증하는 방법을 배웠습니다. 단순히 버튼을 만드는 것이 아니라 props 타입, import 경로, 반응형 기준, Figma와의 간격 차이까지 확인하면서 재사용 가능한 UI 단위를 만들려고 했습니다.

## 문제 해결 스토리 3 — 빌드/배포/SEO

### 상황

로컬에서는 동작하지만 build, Storybook, production, SEO 설정 단계에서 module not found, dependency, sitemap/robots, 환경변수 문제가 발생했다.

### 행동

- 오류를 코드/import/package/env/Storybook 설정으로 나눠 확인
- build error 발생 시 hotfix PR로 공유
- `next-sitemap`이 생성하는 sitemap/robots의 역할 확인
- Naver site verification, 운영 도메인, production build 조건 확인

### 결과/학습

프론트엔드 운영은 로컬 화면 구현뿐 아니라 검색 노출, 빌드 안정성, 환경변수, 도메인 설정까지 포함한다는 것을 배웠다.

### 면접 답변 문장

> 로컬에서 보이는 화면과 실제 운영 가능한 화면은 다르다는 걸 배웠습니다. build와 Storybook 오류를 추적하고, sitemap/robots와 네이버 소유권 인증처럼 운영에 필요한 설정도 확인했습니다.

## 문제 해결 스토리 4 — Git/GitHub 협업

### 상황

기능 개발 과정에서 브랜치, 원격 저장소 권한, PR, build error, conflict 가능성이 함께 등장했다.

### 행동

- feature/develop/hotfix 브랜치 흐름을 정리
- PR 메시지와 리뷰 요청 문구를 구조화
- build error를 분리해 hotfix PR로 처리
- remote와 branch, local/remote tracking branch 차이를 학습

### 결과/학습

Git을 단순 명령어가 아니라 팀 협업 안정성을 위한 도구로 이해하게 됐다.

### 면접 답변 문장

> 처음에는 Git 명령어 자체가 헷갈렸지만, 프로젝트를 진행하면서 feature/develop/hotfix 브랜치와 PR 중심 협업을 익혔습니다. 오류가 생겼을 때 로컬에서만 고치는 게 아니라 어떤 브랜치에서 수정하고 어떻게 팀에 공유할지까지 고민하게 됐습니다.

## AI 활용 답변 가이드

### 피해야 할 표현

- “AI가 만들어줬습니다.”
- “AI한테 물어보면서 코딩했습니다.”
- “AI 없으면 못 합니다.”

### 좋은 표현

> AI는 코드를 대신 작성시키는 도구라기보다, 오류 로그를 해석하고 개념을 학습하고 협업 메시지를 정리하는 러버덕처럼 활용했습니다. TypeScript 타입 오류, Next.js 라우팅, Swagger endpoint, Git 명령 오류, Storybook module resolution 문제를 만났을 때 원인 후보를 정리하고 제가 이해한 뒤 적용했습니다.

## 최종 이력서 bullet 묶음

- Next.js/React/TypeScript 기반 소상공인 협업 플랫폼에서 상점/지도/채팅/온보딩 UI를 구현했습니다.
- Swagger 문서를 기반으로 API endpoint를 식별하고 Axios client/interceptor를 구성해 인증 토큰 기반 요청 구조를 정리했습니다.
- Storybook을 활용해 주요 UI 컴포넌트를 문서화하고 Tailwind CSS 기반 모바일 반응형 레이아웃을 개선했습니다.
- Next.js build, Storybook, module resolution, sitemap/robots, 네이버 소유권 인증 등 운영 반영 과정의 이슈를 점검했습니다.
- GitHub PR 기반 협업 과정에서 feature/hotfix 브랜치, build error 대응, 리뷰 요청 메시지 정리를 경험했습니다.

## 사용자 확인 필요

- 정확한 프로젝트 기간
- 팀 규모와 본인 담당 기능 범위
- 실제 배포 URL/운영 기간
- 실제 사용자/상점 유치 여부
- 최종 서비스명: 소상상점/동사장/기타 명칭 관계

## 관련 링크

- [[sosangsangjeom-ai-learning-summary]]
- [[01-git-collaboration]]
- [[02-api-auth]]
- [[03-storybook-ui]]
- [[04-build-deploy-seo]]
- [[05-business-growth]]
