---
type: project
date: 2026-05-02
status: evidence-draft
confidence: medium
tags: [resume, project, nextjs, small-business, ecommerce, boilerplate, frontend]
source_paths:
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
  - /host/users/skdhu/antigravity/dgsajang-homepage-user-web
  - /host/users/skdhu/antigravity/pox-user-web
  - /host/users/skdhu/antigravity/dgsajang-user-web-bp
  - /host/users/skdhu/.cursor-tutor/small-shop_project
---

# 소상공인/동사장/상점 사용자 웹 프로젝트군

## 한 줄 요약

소상공인/상점/홈페이지 사용자 웹을 대상으로 한 Next.js/React 프론트엔드 프로젝트군입니다. 실제 이력서에서는 하나의 큰 “소상공인 상점/홈페이지 사용자 웹” 경험으로 묶고, playground/boilerplate 성격의 저장소는 보조 근거로만 쓰는 것이 좋아 보입니다.

## 관련 원본 경로

### 실제 프로젝트 후보

- `/host/users/skdhu/.cursor-tutor/sosangsangjeom-client`
  - `package.json` name: `smallbiz-shop-client`
  - Next.js, Zustand, Storybook, next-sitemap, framer-motion, swiper 등 확인
- `/host/users/skdhu/antigravity/dgsajang-homepage-user-web`
  - Next.js 14 사용자 웹 boilerplate 설명
- `/host/users/skdhu/antigravity/pox-user-web`
  - 기존 서비스 코드를 pox로 재정리한 Next.js 14 사용자 웹 템플릿 설명
- `/host/users/skdhu/antigravity/dgsajang-user-web-bp`
  - Next.js User Boilerplate

### 낮은 우선순위 / 초기 React 관리자 프로젝트 후보

- `/host/users/skdhu/.cursor-tutor/small-shop_project`
  - Vite/React 또는 CRA 계열로 보이며 관리자/상점/채팅/게시판 구성 확인

## 기술 스택 후보

- Next.js 14 App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui / Radix UI
- React Query
- Recoil 또는 Zustand
- Axios API Client
- Storybook / Chromatic
- next-sitemap
- framer-motion
- swiper
- Docker / standalone build / PM2 배포 스크립트

## 확인된 기능 영역

### `sosangsangjeom-client`

- 인증/onboarding
  - `src/app/(auth)/login/page.tsx`
  - `src/app/onboarding/page.tsx`
  - `src/entities/auth/*`
- 상점/그룹 상점 UI
  - `src/entities/store/*`
  - `src/entities/group-stores/*`
  - `src/views/group-stores/*`
- 채팅 UI
  - `src/entities/chat/ui/ChatRoomItem.tsx`
  - `ChatRoomMessageItem.tsx`
- 지도/상점 상세 UI
  - `src/entities/map/ui/DetailGroupStoreItem.tsx`
- Storybook 기반 UI 컴포넌트 문서화
  - `src/stories/*`

### `dgsajang-homepage-user-web` / `pox-user-web`

README 기준 포함 기반:

- Next.js 14 App Router
- Tailwind CSS + shadcn/ui
- React Query
- Recoil
- Axios API client
- Jest 테스트 설정
- standalone build 및 배포 스크립트

주요 코드 영역:

- 상품/카테고리/장바구니/주문
  - `src/service/products.ts`
  - `productCategory.ts`
  - `cart.ts`
  - `order.ts`
  - `orderItem.ts`
- 인증/로그인
  - `src/context/AuthContext.tsx`
  - `src/service/auth.ts`
  - `src/hooks/useAuthCode.ts`
- 홈페이지/상점 레이아웃
  - `ProductSection.tsx`
  - `ProductSlider.tsx`
  - `ShopHeader.tsx`

## 실제 이력서용 선별 판단

### 이력서에 쓸 만한 핵심

- `sosangsangjeom-client`: 소상공인 상점/협업/채팅/지도/스토리북 UI까지 포함되어 실제 프로젝트성이 높음.
- `dgsajang-homepage-user-web` 또는 `pox-user-web`: 사용자 웹 템플릿/보일러플레이트로, 여러 서비스에 재사용 가능한 프론트엔드 기반을 정리한 경험으로 표현 가능.

### 주의할 점

- `dgsajang-user-web-bp`, `dgsajang-homepage-user-web`, `pox-user-web`는 README가 거의 같은 boilerplate/템플릿 설명입니다. 이력서에서는 각각을 별도 프로젝트처럼 나열하기보다 “Next.js 사용자 웹 템플릿/보일러플레이트 구축 및 서비스별 변형”으로 묶는 편이 안전합니다.
- `small-shop_project`는 초기 React 관리자 프로젝트 또는 실험/이전 버전으로 보입니다. 핵심 프로젝트로 쓰기보다는 소상공인 서비스 경험의 초기 버전/학습 근거로 보는 것이 좋습니다.

## 문제 해결 경험 후보

### 1. 서비스별 Next.js 사용자 웹 템플릿화

- 문제: 소상공인/상점 서비스마다 로그인, API client, 메뉴, 상품, 주문, 장바구니, 배포 구조가 반복됨.
- 해결 후보: Next.js 14 App Router, Tailwind/shadcn, React Query, Recoil/Axios 기반 템플릿을 구성하고 서비스별 설정을 `app.config`, route, service layer에서 교체할 수 있게 한 것으로 보임.
- 이력서 표현:
  - 반복되는 사용자 웹 구조를 Next.js 14 기반 템플릿으로 정리해 서비스별 설정/라우트/API만 교체할 수 있는 구조를 구성했습니다.

### 2. API service/model/query 계층 분리

- 근거: `src/service/*`, `src/service/models/*`, `src/service/queries/*` 구조.
- 이력서 표현:
  - 상품, 카테고리, 장바구니, 주문, 인증 API를 service/model/query 계층으로 분리해 화면 컴포넌트와 데이터 요청 로직의 결합도를 낮췄습니다.

### 3. UI 컴포넌트 문서화/재사용

- 근거: `sosangsangjeom-client/src/stories/*` Storybook 파일 다수.
- 이력서 표현:
  - Storybook을 활용해 상점 리스트, 채팅 메시지, 배너, 링크, 카테고리 등 재사용 UI 컴포넌트를 문서화했습니다.

### 4. SEO/사이트맵/배포 고려

- 근거: `next-sitemap`, standalone build/PM2 배포 README.
- 이력서 표현:
  - Next.js의 SSR/SSG, sitemap, standalone build 구성을 고려해 사용자 웹의 검색 노출과 배포 구조를 정리했습니다.

## 이력서 bullet 초안

- 소상공인 상점 사용자 웹에서 인증, 상점 목록/상세, 그룹 상점, 채팅 UI, 온보딩 화면을 Next.js 기반으로 구현했습니다.
- 상품/카테고리/장바구니/주문/인증 API를 service/model/query 계층으로 분리해 프론트엔드 데이터 요청 구조를 정리했습니다.
- Storybook을 활용해 상점 카드, 채팅 메시지, 배너, 메뉴 등 재사용 UI 컴포넌트를 문서화하고 디자인 일관성을 높였습니다.
- Next.js 14 App Router, Tailwind/shadcn, React Query, Axios 기반 사용자 웹 템플릿을 구성해 서비스별 변형이 가능한 프론트엔드 기반을 만들었습니다.

## 사용자 확인 필요

- `sosangsangjeom-client`, `dgsajang-homepage-user-web`, `pox-user-web` 각각의 실제 서비스 관계.
- 배포 여부와 실제 사용자/상점 데이터 연결 여부.
- 본인이 담당한 기능 범위.
- `동사장`/`소상상점`의 최종 서비스명.
