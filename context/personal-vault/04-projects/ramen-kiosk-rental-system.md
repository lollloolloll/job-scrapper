---
type: project
date: 2026-05-02
status: evidence-draft
confidence: medium
tags: [resume, project, nextjs, kiosk, rental, pwa, admin, drizzle]
source_paths:
  - /host/users/skdhu/.cursor-tutor/ramen-kiosk
  - /host/users/skdhu/.cursor-tutor/dby-ramen-kiosk
  - /workspace/_memory/Obsidian Vault/08-summaries/ai-log-index/claude-index.md
---

# Ramen/Kiosk 대여 관리 시스템

## 한 줄 요약

Next.js 기반의 키오스크/대여 관리 성격 프로젝트입니다. 사용자 키오스크 화면, 관리자 대시보드, 물품/사용자/대여 기록/대기열 관리, 인증, 통계, PWA/Docker 구성을 다룬 실제 프로젝트 후보입니다.

## 청소년 시설 쌍청문 근로장학생 맥락

사용자 직접 확인에 따르면, 이 프로젝트 계열은 청소년 시설 **쌍청문**에서 근로장학생으로 일하며 실제 기관 운영 문제를 해결하기 위해 혼자 풀스택으로 개발·운영한 경험과 연결됩니다. 특히 `dby-ramen-kiosk`는 당시 쌍청문 부장님이 다른 기관 관장님으로 이동한 뒤, 기존 키오스크 시스템을 좋게 보고 새 기관 환경에 맞춘 수정 요청을 하면서 진행 중인 커스터마이징 작업입니다.

관련 자기이해/면접 스토리 노트: [[2026-05-youth-facility-work-scholarship-project-story]]

## 원본 후보

현재 유사 프로젝트가 두 개 있습니다.

- `/host/users/skdhu/.cursor-tutor/ramen-kiosk`
- `/host/users/skdhu/.cursor-tutor/dby-ramen-kiosk`

둘 다 `package.json`의 name은 `ramen-kiosk`이고 구조가 매우 유사합니다. `dby-ramen-kiosk` 쪽이 파일 수가 더 많고 theme 관련 화면이 추가되어 있어 후속/확장 버전일 가능성이 있습니다.

## 기술 스택 후보

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI / shadcn 계열 UI
- TanStack Table
- dnd-kit
- Drizzle ORM / drizzle-kit
- better-sqlite3 계열 로컬 DB 가능성
- NextAuth / bcrypt 기반 인증 흔적
- Docker / docker-compose
- PWA 관련 패키지

## 확인된 기능 영역

- 키오스크 화면
  - `src/app/(kiosk)/kiosk/KioskPageClient.tsx`
  - `src/app/(kiosk)/kiosk/page.tsx`
- 관리자 대시보드/통계
  - `src/app/(admin)/admin/page.tsx`
  - `src/app/(admin)/admin/RentalAnalyticsClient.tsx`
- 물품 관리
  - `src/app/(admin)/admin/items/*`
  - `src/components/item/ItemCard.tsx`
  - `src/components/item/RentalDialog.tsx`
- 대여/반납/대기열
  - `src/lib/actions/rental.ts`
  - `src/app/(admin)/admin/waitings/*`
  - `src/app/(admin)/admin/records/*`
- 사용자/관리자 계정 관리
  - `src/app/(admin)/admin/users/*`
  - `src/app/(admin)/admin/adminAccount/*`
- 인증
  - `src/app/(auth)/login/page.tsx`
  - `src/lib/auth/actions.ts`
  - `src/components/NextAuthProvider.tsx`
- 동의서/프로모션/테마 설정
  - `src/app/(admin)/admin/consent/page.tsx`
  - `src/app/(admin)/admin/promotion/page.tsx`
  - `dby-ramen-kiosk`에는 `theme/ThemeBuilderClient.tsx` 확인

## 관련 AI 작업 이력 근거

Claude/ChatGPT 로그 인덱스에서 다음 제목들이 확인됩니다.

- `Automatic rental expiration handling with lazy check`
- `Database schema updates for rental tracking`
- `Kiosk rental page with consent file`
- `Rental waitlist display feature`
- `Item rental status logic fix`
- `Rental records management`
- `PWA building with Next.js turbo-pack`
- `Docker Compose build error troubleshooting`
- `Docker 볼륨에서 local.db 파일 초기화 동작`
- `Next.js PageProps type constraint error`

## 문제 해결 경험 후보

### 1. 대여 만료 자동 처리

- 문제: 대여 기간이 만료된 항목을 어떻게 자동으로 처리할지 결정해야 함.
- 근거: `Automatic rental expiration handling with lazy check`, `Database schema updates for rental tracking` 대화 이력.
- 해결 후보: 조회/접근 시점에 만료 여부를 확인하는 lazy check 방식 또는 DB schema 업데이트를 통한 상태 관리.
- 이력서 표현:
  - 대여 만료 상태를 조회 시점에 판정하는 lazy check 방식을 검토해 별도 배치 작업 없이 대여 상태를 일관되게 관리하는 방향을 설계했습니다.

### 2. 대기열/대여 상태 표시 로직

- 문제: 물품 대여 가능/대여중/대기열 상태를 사용자와 관리자 화면에서 일관되게 보여야 함.
- 근거: `Rental waitlist display feature`, `Item rental status logic fix`, `active-rentals-columns.tsx`.
- 이력서 표현:
  - 물품 대여 상태와 대기열 표시 로직을 분리해 키오스크 화면과 관리자 기록 화면에서 일관된 상태를 제공했습니다.

### 3. 관리자 기록/필터/통계 화면

- 문제: 대여 기록, 활성 대여, 사용자/물품 관리 데이터를 관리자가 빠르게 확인해야 함.
- 근거: `records`, `waitings`, `RentalAnalyticsClient`, `TanStack Table` 의존성.
- 이력서 표현:
  - TanStack Table 기반 관리자 테이블과 필터 UI를 구성해 대여 기록, 대기열, 활성 대여 현황을 관리할 수 있게 했습니다.

### 4. PWA/Docker/로컬 DB 문제

- 문제: Next.js PWA, Docker Compose, 로컬 DB 파일 초기화 등 개발/배포 환경 이슈.
- 근거: `PWA building with Next.js turbo-pack`, `Docker Compose build error troubleshooting`, `Docker 볼륨에서 local.db 파일 초기화 동작`.
- 이력서 표현:
  - Docker Compose와 로컬 DB 볼륨 동작을 점검하며 Next.js 기반 키오스크 앱의 개발/실행 환경 문제를 해결했습니다.

## 이력서 bullet 초안

- Next.js 기반 키오스크/대여 관리 시스템에서 사용자 대여 화면, 관리자 물품/사용자/대여 기록 관리 화면을 구현했습니다.
- 대여 만료, 대기열, 대여 상태 표시 로직을 설계해 사용자 화면과 관리자 화면의 상태 불일치 문제를 줄였습니다.
- Drizzle ORM과 로컬 DB 구성을 활용해 물품, 사용자, 대여 기록 데이터를 관리하고 Docker Compose 기반 실행 환경을 구성했습니다.
- TanStack Table 기반 관리자 테이블과 필터 UI를 통해 대여 기록과 활성 대여 현황을 조회할 수 있게 했습니다.

## 사용자 확인 필요

- 실제 프로젝트명이 라멘 키오스크인지, 복지시설/물품 대여 시스템인지 확인 필요.
- `ramen-kiosk`와 `dby-ramen-kiosk` 중 최종본이 무엇인지 확인 필요.
- 실제 배포/운영 여부, 사용 장소, 사용자 수, 기여 범위 확인 필요.
