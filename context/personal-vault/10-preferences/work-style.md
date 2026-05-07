---
type: preference
status: active
confidence: high
date: 2026-05-06
tags: [자기이해, 작업스타일, AI활용, 문제해결, 개발성향]
source_notes:
  - [[2026-05-youth-facility-work-scholarship-project-story]]
  - [[2026-05-ai-native-workflow-strength-story]]
  - [[2026-05-web-agency-mvp-side-business-story]]
  - [[resume-bullets-by-project]]
  - [[venue-booking-system]]
  - [[ramen-kiosk-rental-system]]
---

# 작업 스타일

## 한 줄 요약

사용자는 단순히 화면이나 기능을 만드는 것보다, **실제 운영 문제·사용자 흐름·도메인 맥락을 이해한 뒤 웹 시스템으로 구조화하는 작업**에서 강점이 가장 잘 드러난다.

## 반복적으로 보이는 작업 방식

### 1. 현장/사용자 문제를 기능 구조로 바꾸는 방식

반복 패턴:

```text
현장/사용자 불편 발견
  → 업무 흐름 이해
  → 필요한 화면과 데이터 구조로 분해
  → 관리자/사용자 흐름 구현
  → 운영 중 필요한 정책 반영
```

근거:

- 쌍청문 공간대여 예약 시스템: 기관 내부 공간 예약 업무를 웹 시스템으로 전환.
- 쌍청문 키오스크/대여 관리 시스템: 물품 대여, 대기열, 만료 처리, 관리자 기록 등 실제 운영 흐름 반영.
- 웹에이전시/MVP 프로젝트: 고객 유입, 상담/문의, 랜딩 페이지, FAQ 등 사용자가 문의까지 가는 흐름을 고민.

### 2. 프론트엔드를 구조 문제로 보는 성향

사용자는 프론트엔드를 단순 UI 구현으로만 다루기보다 다음 요소를 함께 본다.

- API 연동
- OAuth/callback/token 저장
- 상태관리
- middleware/redirect/static path
- Storybook 컴포넌트 문서화
- sitemap/robots/SEO
- build/deploy 환경

따라서 “UI만 만드는 사람”보다 **사용자 웹의 흐름과 운영 품질을 같이 보는 프론트엔드 개발자**에 가깝다.

### 3. 디버깅할 때 원인 후보를 쪼개는 방식

반복 패턴:

```text
오류/불일치 발생
  → 로그와 현상 정리
  → 프론트 payload / API / DB / 환경설정 중 원인 후보 분리
  → 관련 개념 확인
  → 수정 후 재검증
```

근거 후보:

- 예약 payload와 Supabase column mismatch 추적.
- Next.js middleware/static resource/redirect 문제.
- Storybook addon/router/SVG/빌드 설정 문제.
- Petmily 계열의 axios, React Router, MyBatis, JavaBean, SQL 파라미터 추적 경험.

### 4. 작업 기록을 재사용 가능한 지식으로 바꾸려는 성향

사용자는 작업 결과를 일회성 대화로 흘려보내기보다, Obsidian/Graphify/Git 기반으로 다시 찾을 수 있게 만드는 쪽에 관심이 크다.

현재 memory workflow:

```text
raw AI log / project evidence
  → compact index
  → curated note
  → Graphify graph
  → resume/interview/career strategy 재사용
```

이 성향은 AI-native workflow 강점과 연결된다.

## 잘 맞는 작업 환경

- 실제 사용자가 있거나 운영 맥락이 있는 서비스.
- 프론트엔드 중심이지만 API/DB/배포를 함께 볼 수 있는 프로젝트.
- 빠른 실험과 개선이 가능한 초기 서비스/MVP 환경.
- 기획과 개발 사이를 오가며 요구사항을 기능으로 구체화하는 환경.
- AI 도구를 문제 구조화, 문서화, 코드 이해에 사용할 수 있는 환경.

## 덜 맞을 가능성이 있는 작업

- 순수 퍼블리싱만 반복하는 작업.
- 사용자/서비스 맥락 없이 티켓만 처리하는 작업.
- 백엔드/인프라만 깊게 파는 전문 포지션.
- AI 사용 자체를 금기시하거나 기록/문서화를 거의 하지 않는 환경.

## 이력서/면접에 안전한 표현

> 실제 운영 문제를 웹 시스템으로 구조화하는 데 관심이 많습니다. 청소년 시설에서 공간 예약과 물품 대여 업무를 시스템화했고, 소상공인 협업 플랫폼과 웹에이전시/MVP 프로젝트를 통해 사용자 흐름과 서비스 운영 관점까지 함께 고민했습니다.

## 주의할 표현

- “AI가 개발을 자동화했다”처럼 말하지 않는다.
- “풀스택을 다 깊게 한다”보다 “프론트엔드 중심으로 필요한 백엔드/DB까지 구현했다”가 안전하다.
- 기관/고객 프로젝트의 정량 성과는 확인 전까지 과장하지 않는다.
