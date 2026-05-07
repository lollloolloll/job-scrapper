---
type: summary
date: 2026-05-02
status: draft
confidence: medium
tags: [resume, portfolio, project-selection, evidence]
source_paths:
  - /host/users/skdhu
  - /workspace/_resume-source/project_inventory.json
  - /workspace/_resume-source/selected_project_evidence.json
---

# 이력서용 프로젝트 선별 요약

## 결론

현재 원본 코드와 문서 기준으로 이력서에 우선 반영할 만한 실제 프로젝트는 다음 순서입니다.

1. [[petmily]]
2. [[venue-booking-system]]
3. [[ramen-kiosk-rental-system]]
4. [[small-business-web-projects]]

아래 항목들은 후보이긴 하지만, 이력서에는 단독 프로젝트로 많이 나열하기보다 위 프로젝트의 하위 경험 또는 보조 경험으로 묶는 것이 좋습니다.

- `dgsajang-homepage-user-web`
- `pox-user-web`
- `dgsajang-user-web-bp`
- `small-shop_project`
- `sajang-marketing`
- `smy_booking_flutter`

`agent-playgroud`, `python_data_analysis_project`는 이름/구조상 이력서 핵심 프로젝트보다는 실험/연습/도구 탐색 성격으로 분류하는 것이 안전합니다.

---

## 1. Petmily 웹 풀스택 프로젝트

### 이력서 가치

가장 오래되고 기본기가 드러나는 프로젝트입니다. 국비학원 6개월 수강 후 작업한 웹 풀스택 프로젝트라는 맥락이 있고, 별도 트러블슈팅 문서가 있어 “문제를 겪고 해결한 과정”을 가장 구체적으로 말할 수 있습니다.

### 핵심 키워드

- React / Vite
- Spring Boot
- MyBatis
- Spring Security
- OAuth/JWT
- AWS S3
- 게시판/댓글/회원/지도/채팅/다이어리
- 파일 업로드
- 프론트-백엔드 데이터 바인딩

### 이력서 bullet 후보

- React/Vite와 Spring Boot 기반 반려동물 커뮤니티 웹 프로젝트에서 게시판, 댓글, 회원, 지도/장소, 파일 업로드 기능을 구현하며 프론트엔드-백엔드 연동 흐름을 경험했습니다.
- Axios 요청 방식, URL query, React Router, `useEffect` 로딩 상태를 점검해 게시글 목록/상세/페이지네이션 렌더링 문제를 해결했습니다.
- MyBatis Mapper 반환 타입, JavaBean 필드명, SQL 파라미터 바인딩을 정리해 게시판/댓글 데이터 매핑 오류와 NullPointerException을 디버깅했습니다.
- 파일 업로드 과정에서 File 객체 처리, FormData 전송, Spring multipart 제한, S3 경로 설정을 단계적으로 확인해 업로드/조회 문제를 해결했습니다.

---

## 2. Venue Booking System 방 예약 시스템

### 이력서 가치

최근 프로젝트성/도메인 복잡도가 가장 좋아 보입니다. 예약 도메인은 단순 CRUD보다 정책/제약조건/관리자 기능/DB migration을 설명하기 좋습니다.

### 핵심 키워드

- Next.js
- Supabase
- 관리자 대시보드
- 예약 정책
- DB migration
- soft delete
- 게스트 예약
- 자동 승인
- 테스트 스크립트

### 이력서 bullet 후보

- Next.js와 Supabase 기반 방 예약 시스템에서 관리자 예약 대시보드, 회원 관리, 예약 생성/수정 UI와 API 연동 구조를 구현했습니다.
- 예약 자동 승인, 게스트 예약, soft delete, 동아리/소그룹, 시간 제한 등 정책 변경사항을 Supabase migration으로 관리했습니다.
- 예약 payload, DB column, migration 간 불일치 문제를 추적하고 테스트 스크립트를 통해 예약 정책/관리자 배치 작업의 회귀를 검증했습니다.
- Next.js middleware matcher와 public 경로 예외 처리를 조정해 인증 리다이렉트와 정적 리소스 제공 간 충돌을 해결했습니다.

---

## 3. Ramen/Kiosk 대여 관리 시스템

### 이력서 가치

키오스크/대여/관리자/상태관리/만료처리라는 도메인이 명확합니다. 최종 프로젝트명이 정확히 무엇인지 확인하면 이력서에서 강하게 쓸 수 있습니다.

### 핵심 키워드

- Next.js
- TypeScript
- Drizzle ORM
- SQLite/로컬 DB 가능성
- NextAuth
- Docker Compose
- PWA
- 관리자 테이블
- 대여/반납/대기열/만료 처리

### 이력서 bullet 후보

- Next.js 기반 키오스크/대여 관리 시스템에서 사용자 대여 화면, 관리자 물품/사용자/대여 기록 관리 화면을 구현했습니다.
- 대여 만료, 대기열, 대여 상태 표시 로직을 설계해 사용자 화면과 관리자 화면의 상태 불일치 문제를 줄였습니다.
- Drizzle ORM과 로컬 DB 구성을 활용해 물품, 사용자, 대여 기록 데이터를 관리하고 Docker Compose 기반 실행 환경을 구성했습니다.
- TanStack Table 기반 관리자 테이블과 필터 UI를 통해 대여 기록과 활성 대여 현황을 조회할 수 있게 했습니다.

---

## 4. 소상공인/동사장/상점 사용자 웹 프로젝트군

### 이력서 가치

여러 저장소가 비슷한 구조라 단독 프로젝트 여러 개로 나열하기보다는 “소상공인 상점 사용자 웹 / Next.js 사용자 웹 템플릿 구축”으로 묶는 것이 좋습니다.

### 핵심 키워드

- Next.js 14 App Router
- Tailwind CSS / shadcn/ui
- React Query
- Recoil / Zustand
- Axios API client
- Storybook
- 상품/카테고리/장바구니/주문/인증
- 상점/그룹 상점/채팅 UI
- standalone build / PM2 배포

### 이력서 bullet 후보

- 소상공인 상점 사용자 웹에서 인증, 상점 목록/상세, 그룹 상점, 채팅 UI, 온보딩 화면을 Next.js 기반으로 구현했습니다.
- 상품/카테고리/장바구니/주문/인증 API를 service/model/query 계층으로 분리해 프론트엔드 데이터 요청 구조를 정리했습니다.
- Storybook을 활용해 상점 카드, 채팅 메시지, 배너, 메뉴 등 재사용 UI 컴포넌트를 문서화하고 디자인 일관성을 높였습니다.
- Next.js 14 App Router, Tailwind/shadcn, React Query, Axios 기반 사용자 웹 템플릿을 구성해 서비스별 변형이 가능한 프론트엔드 기반을 만들었습니다.

---

## 낮은 우선순위 후보

### `smy_booking_flutter`

- Flutter 기본 프로젝트 흔적이지만 코드 파일이 매우 적습니다.
- 이력서 핵심 프로젝트로 쓰기에는 근거가 약합니다.

### `sajang-marketing`

- Next.js 마케팅 페이지 후보입니다.
- 단독 프로젝트보다 소상공인/동사장 프로젝트군의 랜딩/마케팅 페이지로 묶는 편이 좋습니다.

### `agent-playgroud`

- 파일 수와 기술 스택은 크지만 이름상 playground 성격이 강합니다.
- 이력서에는 “개인 AI 실험/자동화 환경 탐색” 정도로만 보조 기재하는 것이 안전합니다.

---

## 다음 확인 질문

이력서 최종 문장으로 바꾸려면 아래 정보가 필요합니다.

1. Petmily 팀 규모와 본인 담당 기능은 어디까지였는가?
2. Petmily 프로젝트 기간은 언제부터 언제까지인가?
3. 방 예약 시스템은 실제 사용자/동아리/기관이 있었는가, 아니면 개인 프로젝트인가?
4. Ramen/Kiosk 프로젝트의 최종 서비스명과 대상 사용자는 무엇인가?
5. `ramen-kiosk`와 `dby-ramen-kiosk` 중 최종본은 무엇인가?
6. 소상공인/동사장 프로젝트는 실제 서비스/외주/협업 프로젝트인가, 개인 포트폴리오인가?
7. 배포 URL 또는 GitHub 공개 가능 여부가 있는가?

---

## 이력서 구성 추천

### 프로젝트 3개만 넣는 경우

1. Venue Booking System
2. Ramen/Kiosk 대여 관리 시스템
3. Petmily

### 프론트엔드 지원용으로 넣는 경우

1. 소상공인/동사장 사용자 웹 프로젝트군
2. Venue Booking System
3. Ramen/Kiosk 대여 관리 시스템
4. Petmily

### 백엔드/풀스택 지원용으로 넣는 경우

1. Petmily
2. Venue Booking System
3. Ramen/Kiosk 대여 관리 시스템

## 원본 보호 원칙

원본은 `/host/users/skdhu`에서 읽기 전용으로만 확인했습니다. 분석 결과는 `/workspace/_memory/Obsidian Vault`에만 작성했습니다.
