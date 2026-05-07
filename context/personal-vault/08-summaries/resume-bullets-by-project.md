---
type: summary
date: 2026-05-04
status: active
confidence: medium-high
tags: [resume, project-bullets, portfolio]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/resume-project-evidence.md
  - /workspace/_memory/Obsidian Vault/04-projects/small-business-web-projects.md
  - /host/users/skdhu
---

# Project별 Resume Bullet 정리

## 사용 원칙

- 이 문서는 이력서에 바로 옮기기 위한 bullet bank다.
- `확정 가능`은 현재 코드/문서/AI 로그 근거만으로 비교적 안전한 문장이다.
- `확인 후 사용`은 기간, 팀 규모, 본인 담당 범위, 배포/사용자 지표를 사용자가 확인한 뒤 공격적으로 쓸 문장이다.
- 정량 수치가 검증되지 않은 경우 성과를 과장하지 않는다.

## 1. 소상상점 / 소상공인 협업 플랫폼

### 확정 가능 bullet

- Next.js/React/TypeScript 기반 소상공인 협업 플랫폼에서 온보딩, 상점/그룹상점, 협업, 채팅, 지도 UI 등 사용자 화면을 구현했습니다.
- Axios 기반 API client와 도메인별 API module을 활용해 인증, 상점, 협업, 알림, 검색, 사용자 정보 요청 구조를 정리했습니다.
- Storybook을 활용해 버튼, 카드, 채팅 메시지, 상점 UI 등 재사용 컴포넌트를 문서화하고, Next.js 환경의 addon/SVG/router 설정 문제를 해결했습니다.
- next-sitemap, robots, middleware 검색봇 예외 처리, 네이버 소유권 인증 등 프론트엔드 배포·SEO 운영 이슈를 경험했습니다.
- GitHub feature/fix/hotfix branch와 PR template 기반 협업 흐름에서 build error, Storybook migration, UI/SEO 수정 작업을 진행했습니다.

### 확인 후 사용 bullet

- 약 8개월 이상 운영된 팀 프로젝트에서 프론트엔드 주요 기능 개발과 배포/SEO 개선을 지속적으로 담당했습니다.
- `skdhu` author 기준 다수 커밋이 확인되는 장기 프로젝트에서 UI 컴포넌트, API 연동, 운영 설정 개선을 반복적으로 수행했습니다.
- 소상공인 영업/상권 협업 전략을 검토하며 사용자 문제와 서비스 기능을 연결하는 기획 관점까지 경험했습니다.

### 면접 핵심 키워드

`Next.js`, `Storybook`, `OAuth`, `Axios`, `Zustand`, `next-sitemap`, `middleware`, `GitHub PR`, `소상공인 도메인`

## 2. Petmily 웹 풀스택 프로젝트

### 확정 가능 bullet

- React/Vite와 Spring Boot 기반 반려동물 커뮤니티 웹 프로젝트에서 게시판, 댓글, 회원, 지도/장소, 파일 업로드 기능을 구현하며 프론트엔드-백엔드 연동 흐름을 경험했습니다.
- Axios 요청 방식, URL query, React Router, `useEffect` 로딩 상태를 점검해 게시글 목록/상세/페이지네이션 렌더링 문제를 해결했습니다.
- MyBatis Mapper 반환 타입, JavaBean 필드명, SQL 파라미터 바인딩을 정리해 게시판/댓글 데이터 매핑 오류와 NullPointerException을 디버깅했습니다.
- 파일 업로드 과정에서 File 객체 처리, FormData 전송, Spring multipart 제한, S3 경로 설정을 단계적으로 확인해 업로드/조회 문제를 해결했습니다.

### 확인 후 사용 bullet

- 국비학원 6개월 수료 후 진행한 팀 프로젝트에서 프론트엔드와 Spring Boot 백엔드 연동을 담당했습니다.
- Spring Security/OAuth/JWT 기반 인증 흐름과 AWS S3 파일 저장 흐름을 프로젝트에서 경험했습니다.

### 면접 핵심 키워드

`React`, `Spring Boot`, `MyBatis`, `Spring Security`, `JWT/OAuth`, `AWS S3`, `파일 업로드`, `SQL 바인딩`

## 3. Venue Booking System / 방 예약 시스템

### 확정 가능 bullet

- Next.js와 Supabase 기반 방 예약 시스템에서 관리자 예약 대시보드, 회원 관리, 예약 생성/수정 UI와 API 연동 구조를 구현했습니다.
- 예약 자동 승인, 게스트 예약, soft delete, 동아리/소그룹, 시간 제한 등 정책 변경사항을 Supabase migration으로 관리했습니다.
- 예약 payload, DB column, migration 간 불일치 문제를 추적하고 테스트 스크립트를 통해 예약 정책/관리자 배치 작업의 회귀를 검증했습니다.
- Next.js middleware matcher와 public 경로 예외 처리를 조정해 인증 리다이렉트와 정적 리소스 제공 간 충돌을 해결했습니다.

### 확인 후 사용 bullet

- 실제 동아리/기관 예약 운영 시나리오를 기준으로 관리자와 사용자 흐름을 분리해 설계했습니다.
- 예약 정책 변경을 migration과 테스트로 관리해 운영 중 데이터 정합성 문제를 줄였습니다.

### 면접 핵심 키워드

`Next.js`, `Supabase`, `DB migration`, `middleware`, `예약 정책`, `관리자 대시보드`, `테스트 스크립트`

## 4. Ramen/Kiosk 대여 관리 시스템

### 확정 가능 bullet

- Next.js 기반 키오스크/대여 관리 시스템에서 사용자 대여 화면, 관리자 물품/사용자/대여 기록 관리 화면을 구현했습니다.
- 대여 만료, 대기열, 대여 상태 표시 로직을 설계해 사용자 화면과 관리자 화면의 상태 불일치 문제를 줄였습니다.
- Drizzle ORM과 로컬 DB 구성을 활용해 물품, 사용자, 대여 기록 데이터를 관리하고 Docker Compose 기반 실행 환경을 구성했습니다.
- TanStack Table 기반 관리자 테이블과 필터 UI를 통해 대여 기록과 활성 대여 현황을 조회할 수 있게 했습니다.

### 확인 후 사용 bullet

- 실제 키오스크/청소년 프로그램 운영 시나리오를 기준으로 대여·반납·만료 정책을 설계했습니다.
- PWA와 Docker 기반 배포/운영 환경을 고려해 현장 사용 가능한 관리 시스템 형태로 발전시켰습니다.

### 면접 핵심 키워드

`Next.js`, `TypeScript`, `Drizzle ORM`, `SQLite`, `NextAuth`, `Docker Compose`, `PWA`, `TanStack Table`, `대여/반납/만료`

## 5. 개인 AI Memory / Obsidian + Graphify 지식저장소

### 확정 가능 bullet

- ChatGPT/Claude raw export와 프로젝트 흔적을 Obsidian Markdown note, compact index, Graphify graph로 변환하는 개인 지식저장소를 구축했습니다.
- raw 대화 전체를 매번 LLM context에 넣지 않고 deterministic scan → compact/monthly index → curated note → graph 재생성 구조로 토큰 비용과 민감정보 노출을 줄였습니다.
- Vault 변경 후 민감정보 검사, Graphify 재생성, Git commit까지 수행하는 versioned memory workflow를 운영했습니다.
- Claude Code, Codex, OpenCode, Hermes Agent 등 AI agent 도구를 직접 실험하며 코드 이해, 디버깅 방향 검토, 문서화, 작업 계획 수립처럼 작업 유형별 활용 방식을 비교했습니다.
- 오류 로그 해석과 개념 확인에 AI를 활용하되, 최종 코드는 직접 검토하고 프로젝트 맥락에 맞게 수정하는 방식으로 학습·개발 속도를 높였습니다.

### 확인 후 사용 bullet

- 개인 개발/학습/프로젝트 이력을 장기적으로 재사용하기 위한 agentic memory pipeline을 설계하고, 이력서/면접/회고 자료로 전환했습니다.

### 면접 핵심 키워드

`Obsidian`, `Graphify`, `RAG`, `LLM Wiki`, `Git versioning`, `raw archive`, `curated knowledge`, `token efficiency`, `Claude Code`, `Codex`, `OpenCode`, `Hermes Agent`, `AI-assisted workflow`

## 6. 웹에이전시/MVP 솔루션 부업·창업 준비

### 확정 가능 bullet

- 친구와 함께 웹에이전시/MVP 솔루션 형태의 부업을 준비하며, Next.js 기반 공식 홈페이지와 고객 유입용 랜딩/상담 흐름을 구현했습니다.
- 서비스 소개, 포트폴리오, 문의/상담, FAQ 등 전환 흐름을 고려한 페이지 구조를 설계하며 모객과 퍼널 설계 관점을 경험했습니다.
- 계약상 공개가 어려운 고객사 웹 프로젝트에서 Next.js 기반 사용자 화면, 로그인/OAuth, 상담/문의, 마이페이지, 공지/FAQ 등 주요 흐름 구현을 진행 중입니다.
- 실제 수주 프로젝트를 통해 요구사항 정리, 공개 범위 관리, 고객 커뮤니케이션, 일정/결과물 관리의 중요성을 경험했습니다.

### 확인 후 사용 bullet

- 공식 홈페이지 공개 URL, 고객사 공개 가능 범위, 역할 분담, 프로젝트 기간을 확인한 뒤 포트폴리오/면접 사례로 확장합니다.
- 비공개 수주 프로젝트는 계약상 허용되는 범위에서만 익명 사례로 설명합니다.

### 면접 핵심 키워드

`Next.js`, `랜딩 페이지`, `상담/문의 흐름`, `MVP`, `웹에이전시`, `수주`, `모객`, `퍼널 설계`, `고객 커뮤니케이션`, `비공개 프로젝트`

## 추천 이력서 구성

### 프론트엔드 집중형

1. 소상상점
2. Venue Booking System
3. Ramen/Kiosk 대여 관리 시스템
4. 웹에이전시/MVP 솔루션 부업·창업 준비
5. Petmily

### 풀스택/백엔드 기초 강조형

1. Petmily
2. Venue Booking System
3. Ramen/Kiosk 대여 관리 시스템
4. 소상상점

### AI 활용/성장형 포트폴리오 포함

1. 소상상점
2. Venue Booking System
3. 개인 AI Memory / Obsidian + Graphify
4. Petmily 또는 Ramen/Kiosk
