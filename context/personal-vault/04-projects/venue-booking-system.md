---
type: project
date: 2026-05-02
status: evidence-draft
confidence: medium-high
tags: [resume, project, nextjs, supabase, reservation, admin, testing]
source_paths:
  - /host/users/skdhu/.cursor-tutor/venue-booking-system
  - /workspace/_memory/Obsidian Vault/08-summaries/ai-log-index/claude-index.md
---

# Venue Booking System 방 예약 시스템

## 한 줄 요약

Next.js와 Supabase 기반의 방/공간 예약 시스템입니다. 관리자 화면, 예약 생성/수정, 회원/동아리 관리, 예약 제약조건, 게스트 예약, 예약 정책 테스트, DB migration을 다룬 실제 프로젝트 후보입니다.

## 청소년 시설 쌍청문 근로장학생 맥락

사용자 직접 확인에 따르면, 이 프로젝트는 청소년 시설 **쌍청문**에서 근로장학생으로 일하며 기관 내부 공간 예약 업무를 효율화하기 위해 혼자 풀스택으로 개발·운영한 경험과 연결됩니다. 따라서 이력서에서는 단순 개인 프로젝트가 아니라 “실제 기관 운영 요구사항을 반영한 내부 업무 시스템”으로 포지셔닝할 수 있습니다.

관련 자기이해/면접 스토리 노트: [[2026-05-youth-facility-work-scholarship-project-story]]

## 근거

- 원본 코드: `/host/users/skdhu/.cursor-tutor/venue-booking-system`
- `package.json` 프로젝트명: `venue-booking-system`
- 주요 의존성:
  - Next.js
  - React
  - Supabase SSR / Supabase JS
  - Firebase / Firebase Admin
  - Zustand
  - Recharts
  - xlsx
  - dnd-kit
- 주요 테스트 스크립트:
  - `test:booking-policy:dev`
  - `test:admin-members`
  - `test:admin-batch-operations`
  - `test:booking-payload`
  - `test:booking-db`
  - `test:client-club-subgroups`
  - `test:account-withdrawal`
- Supabase migration 다수 확인:
  - 예약 제약조건/자동 승인
  - soft delete
  - 게스트 예약
  - 동아리/소그룹
  - 예약 시간 제한
  - 현재 주 예약 정책

## 확인된 기능 영역

- 관리자 로그인/회원 관리
  - `src/app/admin/login/page.tsx`
  - `src/app/admin/members/page.tsx`
  - `src/app/api/admin/members/*`
- 관리자 예약 대시보드
  - `src/components/admin/ui/AdminCalendar.tsx`
  - `AdminDashboard.tsx`
  - `ReservationSheet.tsx`
- 예약 생성/수정
  - `CreateReservationModal.tsx`
  - `EditReservationModal.tsx`
  - `bookingReservationPayload.ts`
- 예약 정책/제약조건
  - `supabase/migrations/*booking_constraints*`
  - `*current_week_booking_policy*`
  - `*booking_time_limit*`
- 동아리/방/목적 설정
  - `InsertClubConfig.sql`
  - `InsertRoomConfig.sql`
  - `reservationClubFields.ts`
- soft delete / 게스트 예약 / 예약 권한
  - `add_softdelete_*`
  - `enable_guest_reservations.sql`
  - `feat_create_past_reservation_privilage.sql`

## 관련 AI 작업 이력 근거

Claude 로그 인덱스에 다음 대화 제목들이 확인됩니다.

- `방 예약 시스템 스키마 설계`
- `예약 데이터 리팩토링 효율성 검토`
- `스키마에 soft delete 로직 추가`
- `게스트 예약 완료 상태 색상 처리`
- `휴무일 예약 UI 로직 적용`
- `예약검색 기준 선택하기`
- `Database column missing in reservations table`
- `관리자 배치 작업 함수 단위 테스트`
- `public/images 경로 미들웨어 제외 적용 여부`
- `Next.js 미들웨어 리다이렉트 npm run dev에서 작동 안 함`

## 문제 해결 경험 후보

### 1. 예약 도메인 스키마와 정책 변경 대응

- 문제: 예약 시스템은 방, 동아리, 목적, 사용자, 게스트, 시간 제한, 자동 승인 등 제약조건이 많아 DB 스키마가 자주 변경됨.
- 해결 후보: Supabase migration을 통해 예약 제약조건, soft delete, 게스트 예약, 동아리 소그룹, 예약 시간 제한 등을 점진적으로 반영.
- 이력서 표현:
  - Supabase migration 기반으로 예약 정책 변경사항을 DB 스키마와 트리거/제약조건에 반영했습니다.

### 2. 관리자 배치 작업과 테스트 코드

- 문제: 관리자 기능은 예약/회원 데이터를 일괄 처리하므로 회귀 버그 위험이 큼.
- 근거: `test:admin-batch-operations`, `관리자 배치 작업 함수 단위 테스트` 대화 이력.
- 이력서 표현:
  - 관리자 배치 작업과 예약 정책 로직에 대한 테스트 스크립트를 구성해 정책 변경 시 회귀를 확인할 수 있게 했습니다.

### 3. 예약 payload와 DB column mismatch 문제

- 문제: 예약 데이터 구조 변경 중 프론트 payload와 DB column이 맞지 않는 문제가 발생한 것으로 보임.
- 근거: `Database column missing in reservations table`, `bookingReservationPayload.ts`, migration 다수.
- 이력서 표현:
  - 예약 생성 payload, API route, Supabase 테이블 column을 함께 추적해 데이터 불일치 문제를 해결했습니다.

### 4. Next.js middleware/static path 문제

- 문제: Next.js middleware가 public image/static resource까지 가로채거나, dev 환경에서 redirect가 기대대로 작동하지 않는 문제.
- 근거: Claude 대화 제목 `public/images 경로 미들웨어 제외 적용 여부`, `Next.js 미들웨어 리다이렉트 npm run dev에서 작동 안 함`.
- 이력서 표현:
  - Next.js middleware matcher와 정적 리소스 경로 예외 처리를 점검해 인증/리다이렉트 흐름의 부작용을 줄였습니다.

## 이력서 bullet 초안

- Next.js와 Supabase 기반 방 예약 시스템에서 관리자 예약 대시보드, 회원 관리, 예약 생성/수정 UI와 API 연동 구조를 구현했습니다.
- 예약 자동 승인, 게스트 예약, soft delete, 동아리/소그룹, 시간 제한 등 정책 변경사항을 Supabase migration으로 관리했습니다.
- 예약 payload, DB column, migration 간 불일치 문제를 추적하고 테스트 스크립트를 통해 예약 정책/관리자 배치 작업의 회귀를 검증했습니다.
- Next.js middleware matcher와 public 경로 예외 처리를 조정해 인증 리다이렉트와 정적 리소스 제공 간 충돌을 해결했습니다.

## 면접 스토리 후보

> 방 예약 시스템은 단순 CRUD가 아니라 사용자 유형, 동아리, 방, 예약 가능 시간, 게스트 예약, 자동 승인 같은 정책이 계속 바뀌는 도메인이었습니다. 기능을 추가할 때마다 프론트 payload, API route, Supabase schema/migration이 함께 바뀌어야 했기 때문에, DB migration을 통해 변경 이력을 관리하고 테스트 스크립트로 예약 정책과 관리자 배치 작업을 확인했습니다. 이 과정에서 도메인 정책을 코드와 DB 제약조건에 나누어 반영하는 경험을 했습니다.

## 사용자 확인 필요

- 실제 서비스 대상/사용자 수/운영 여부.
- 본인이 담당한 화면과 API 범위.
- Firebase Admin 사용 목적.
- 테스트 코드 작성 범위와 실행 결과.
