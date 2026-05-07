---
type: summary
date: 2026-05-02
status: draft
confidence: medium-high
tags: [소상상점, build, deploy, seo, nextjs, storybook, operations, resume]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/sosangsangjeom-ai-learning-summary.md
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
---

# 소상상점 Deep Index 04 — 빌드/배포/SEO/운영

## 핵심 결론

소상상점에서 사용자는 `npm run dev`로 화면을 띄우는 단계에서 끝나지 않고, build error, module resolution, Storybook build, package 의존성, `next-sitemap`, `robots.txt`, 네이버 소유권 인증, 운영 도메인, CDN/속도 의심까지 질문했다.

이 경험은 **로컬 개발을 넘어 운영 반영과 검색 노출까지 고려한 Next.js 프로젝트 경험**으로 정리할 수 있다.

## 자주 등장한 상황

- `npm run dev`, `npm run build`
- `Cannot find module`, `Module not found`
- `node_modules`/`package-lock.json` 삭제 후 재설치 고민
- Next.js 내부 dependency/acorn module 오류
- Storybook build/preview 오류
- package 취약점/audit 확인
- build error 해결 PR
- `sitemap.xml`, `robots.txt` 생성 이유 질문
- `next-sitemap` postbuild 동작
- Naver site verification
- `shop.sosangsangjeom.com` 접속/속도/CDN 의심
- `.env.local`, `.env.production`, production build

## 사용자가 배운 것으로 보이는 개념

### 1. 빌드 오류는 층을 나눠 봐야 한다

빌드 오류는 코드 문법, import alias, 패키지 설치, lockfile, 환경변수, Next.js 설정, Storybook 설정 등 여러 층에서 발생한다. 무조건 `node_modules`를 지우는 방식보다 원인 범주를 먼저 나누는 습관이 중요하다.

### 2. Storybook build는 앱 build와 별도 품질 게이트다

앱은 돌아가도 Storybook alias나 story 경로가 깨지면 컴포넌트 문서화/검증 환경이 무너진다. 이는 [[03-storybook-ui]]와 직접 연결된다.

### 3. SEO 파일은 운영 정책의 일부다

`sitemap.xml`, `robots.txt`, `next-sitemap`, Naver verification은 검색엔진에 어떤 페이지를 알릴지 결정하는 운영 요소다. 자동 생성 파일도 왜 생겼는지 이해하고 commit/배포 여부를 판단해야 한다.

### 4. 로컬과 운영은 다르다

production build, 운영 도메인, CDN, 환경변수, 검색엔진 인증은 로컬 개발에서 드러나지 않는 문제를 만든다.

## 문제 → 원인 → 해결 서사 후보

### 문제

로컬에서는 동작하는 화면이 build/Storybook/운영 배포 단계에서 module resolution, dependency, SEO 설정, 환경변수 문제로 실패하거나 예상과 다르게 동작할 수 있었다.

### 원인

- import alias/story 경로 불일치
- package-lock/node_modules 불일치 또는 dependency 깨짐
- Next.js production build에서만 드러나는 타입/환경변수 문제
- next-sitemap/robots/Naver 인증 파일의 역할 이해 부족

### 해결

- 오류 메시지를 기준으로 코드/import/package/env/Storybook 설정 범주를 나눠 확인
- 필요한 경우 lockfile/의존성 재설치 절차를 점검
- build error를 hotfix PR로 분리해 공유
- sitemap/robots/verification 파일의 생성 원리와 운영 반영 여부를 확인

### 결과/학습

운영 가능한 프론트엔드는 로컬 화면 구현뿐 아니라 build, dependency, SEO, domain, env 설정까지 포함한다는 점을 배웠다.

## 이력서 bullet 후보

- Next.js/Storybook 빌드 과정에서 발생한 dependency, alias, module resolution 오류를 추적하고 hotfix PR로 해결했습니다.
- `next-sitemap` 기반 sitemap/robots 생성, 네이버 소유권 인증, production build 환경을 점검하며 운영 반영 이슈를 처리했습니다.
- 로컬/운영 환경변수 차이와 배포 도메인 조건을 확인하며 Next.js 운영 안정성을 개선했습니다.

## 면접 답변 포인트

> 소상상점에서는 로컬에서 화면이 보이는 것과 실제 운영 가능한 상태가 다르다는 걸 많이 배웠습니다. build나 Storybook에서 module not found가 나면 import alias, 패키지, lockfile, 환경변수를 나눠 확인했고, sitemap이나 robots 파일은 검색 노출과 운영 정책의 일부라는 것도 이해했습니다. 운영 도메인과 네이버 소유권 인증까지 확인하면서 프론트엔드 배포의 범위를 넓게 경험했습니다.

## 관련 링크

- [[sosangsangjeom-ai-learning-summary]]
- [[01-git-collaboration]]
- [[03-storybook-ui]]
- [[05-business-growth]]
- [[06-interview-stories]]
