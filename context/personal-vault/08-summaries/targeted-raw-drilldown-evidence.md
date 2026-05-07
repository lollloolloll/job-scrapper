---
type: summary
date: 2026-05-04
status: active
confidence: medium-high
tags: [ai-log, raw-drilldown, evidence, resume]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/ai-log-index/ai-log-records-compact.json
  - /workspace/_memory/Obsidian Vault/08-summaries/ai-log-index/targeted-raw-drilldown-summaries.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
---

# Targeted Raw Drill-down Evidence

## 목적

`07-questions/raw-drilldown-priority-after-2025-06.md`의 후보 중, 이력서/포트폴리오/소상상점 story bank에 직접 연결될 가능성이 큰 대화만 본문을 부분 확인했다. 원문 전체는 저장하지 않고, 날짜/제목/판단/출처만 curated note로 남긴다.

## 확인 결과 요약

| 날짜 | source | title | messages | 승격 판단 | raw ref |
|---|---|---:|---:|---|---|
| 2025-09-16 | ChatGPT | 스토리북 배포 설정 | 82 | Storybook 설치/배포 과정에서 React/Storybook addon 버전 충돌, package 관리, 배포 공유 흐름을 다룬 대화. Storybook 경험 claim 강화에 사용. | `conversations-018.json` / `686182d954` |
| 2025-09-16 | ChatGPT | Vercel 호스팅 방법 | 50 | Vercel CLI/link/unlink, 프로젝트 연결 초기화, 호스팅 흐름을 다룬 대화. 배포 경험 claim의 학습/대응 근거. | `conversations-018.json` / `a070662234` |
| 2025-10-16 | ChatGPT | 골목형상점가 설명 | 145 | 골목형상점가와 소상공인 협업 도메인 이해를 다룬 대화. 서비스 기획/도메인 이해 story에 사용. | `conversations-019.json` / `bcbc370902` |
| 2025-08-20 | ChatGPT | Git 되돌리기 방법 | 85 | 실제 코드 에러/작업 상태에서 Git 되돌리기 방법을 확인한 대화. 협업 중 reset/revert/checkout 판단 story에 사용. | `conversations-018.json` / `b6d320a700` |
| 2026-01-07 | ChatGPT | OAuth 콜백 URL 설정 | 2 | main/dev 브랜치와 Supabase redirect URL 차이를 질문한 대화. OAuth가 배포 환경과 provider 설정에 묶인다는 근거. | `conversations-023.json` / `1431f8d731` |
| 2026-01-07 | Claude | Kakao OAuth 콜백 URL 환경변수 설정 방식 | 23 | Kakao OAuth callback, 이미지 remotePatterns, 환경변수/배포 설정을 확인한 대화. OAuth/외부 provider 연동 근거. | `claude-export/conversations.json` / `502675309c` |
| 2026-04-09 | Claude | Supabase 인증 이메일 수정하기 | 70 | Supabase auth/client/store/profile 흐름을 다룬 대화. 다른 프로젝트지만 인증 구현 패턴 이해 근거. | `claude-export/conversations.json` / `fceae5f06e` |
| 2026-04-20 | ChatGPT | LLM wiki vs RAG | 22 | 개인 지식 저장소 운영 전략 대화. 현재 Vault/Graphify 운영 방식의 근거이며 resume project보다는 개인 AI memory system에 연결. | `conversations-027.json` / `8ea3bc7fe7` |
| 2025-10-10 | ChatGPT | 소상공인 영업활동 회의록 | 2 | 실제 영업 활동/회의록 문맥을 바탕으로 문제와 실행 전략을 정리한 대화. 사업성/고객확보 story 후보. | `conversations-019.json` / `78b35d0751` |
| 2025-10-03 | ChatGPT | 소상공인 협업 분석 | 4 | 소상공인, 상인회/조합, 협업/마케팅 위치를 분석하기 위한 prompt 정리 대화. 도메인 리서치 근거. | `conversations-019.json` / `d612ec6f6d` |
| 2025-09-26 | ChatGPT | 영업용 멘트 다듬기 | 30 | 영업/설득 문구를 다듬은 대화. 고객 인터뷰/영업 커뮤니케이션 claim 후보이나 실제 실행 여부 확인 필요. | `conversations-019.json` / `d62e1bc451` |
| 2025-08-28 | ChatGPT | 서버컴포넌트 배포 환경 | 22 | Next.js 서버 컴포넌트가 Vercel/서버 자원과 어떻게 연결되는지 질문한 대화. App Router/배포 구조 이해 근거. | `conversations-018.json` / `fb6dd67114` |

## 이력서/면접에 바로 연결되는 대화

### 1. Storybook/배포

- `스토리북 배포 설정`: Storybook dependency/version conflict와 배포 공유 흐름 확인.
- `Vercel 호스팅 방법`: Vercel CLI와 project link/unlink 흐름 확인.
- `서버컴포넌트 배포 환경`: Next.js Server Component와 배포 환경 이해.

연결 노트: [[sosangsangjeom/final-story-bank]], [[sosangsangjeom/03-storybook-ui]], [[sosangsangjeom/04-build-deploy-seo]]

### 2. API/OAuth/Auth

- `OAuth 콜백 URL 설정`: main/dev 브랜치별 redirect URL 문제를 직접 질문.
- `Kakao OAuth 콜백 URL 환경변수 설정 방식`: provider callback, 환경변수, 이미지 remote pattern 이슈 확인.
- `Supabase 인증 이메일 수정하기`: 소상상점은 아니지만 인증/프로필/store/client 구조 이해 근거.

연결 노트: [[sosangsangjeom/02-api-auth]], [[api-layer-and-auth-integration]]

### 3. Git 협업/되돌리기

- `Git 되돌리기 방법`: 실제 코드/타입 에러 상황에서 Git 복구 흐름 확인.

연결 노트: [[sosangsangjeom/01-git-collaboration]], [[git-pr-collaboration]]

### 4. 소상공인 도메인/영업

- `골목형상점가 설명`
- `소상공인 영업활동 회의록`
- `소상공인 협업 분석`
- `영업용 멘트 다듬기`

이 묶음은 기술 claim보다는 “도메인 이해/서비스 기획/고객 확보 고민” story에 사용한다. 다만 실제 영업 실행 여부와 결과는 사용자 확인 전까지 확정하지 않는다.

연결 노트: [[sosangsangjeom/05-business-growth]], [[business-validation-and-local-commerce]]

## 보류/분리

- `LLM wiki vs RAG`는 현재 Vault/Graphify memory system 근거로는 중요하지만, 소상상점 이력서 bullet에는 직접 넣지 않는다. 별도 프로젝트 `개인 AI memory system`이나 자기소개/학습 시스템 문맥에서 사용한다.

## 민감정보 처리

원문 일부에는 인증/토큰/환경변수 관련 내용이 있을 수 있어 본 노트에는 원문 전체를 저장하지 않았다. raw ref로만 추적하고, 필요한 경우에만 안전하게 다시 drill-down한다.
