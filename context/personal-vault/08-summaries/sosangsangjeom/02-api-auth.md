---
type: summary
date: 2026-05-02
status: draft
confidence: medium-high
tags: [소상상점, api, swagger, oauth, auth, axios, frontend, resume]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/sosangsangjeom-ai-learning-summary.md
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
---

# 소상상점 Deep Index 02 — API/Swagger/인증/데이터 연동

## 핵심 결론

소상상점의 API/인증 질문은 프론트엔드 실무 감각을 보여주는 중요한 근거다. 사용자는 Swagger 문서 URL과 실제 endpoint 차이, Axios baseURL, Authorization Bearer token, access token 누락, OAuth redirect URI/callback URL, Kakao/Naver 로그인 설정 등을 반복적으로 물어봤다.

이 경험은 **화면만 만드는 프론트엔드가 아니라 백엔드 API 계약, 인증 흐름, 배포 도메인 설정까지 고려한 프론트엔드 개발 경험**으로 정리할 수 있다.

## 자주 등장한 상황

- Swagger 문서 URL과 실제 API endpoint를 혼동
- `https://api.smallbiz.co.kr/api-docs#...` 형태가 실제 요청 URL인지 질문
- Axios `baseURL` 설정
- request interceptor에서 Authorization Bearer token 설정
- access token이 없을 때 header에 `undefined`가 들어가는 문제
- OAuth redirect URI와 callback URL 설정
- Kakao/Naver 로그인 연동 설정
- API payload/response 구조와 컴포넌트 props 타입 불일치
- 협업/상점/지도/채팅 관련 API 연결 상황 설명

## 사용자가 배운 것으로 보이는 개념

### 1. Swagger는 문서이고 endpoint는 별도다

Swagger UI의 URL은 API 문서를 보는 주소이고, 실제 요청은 baseURL + endpoint로 구성된다. 이 차이를 이해한 것은 API 연동의 기본기를 익힌 중요한 흔적이다.

### 2. 인증은 프론트 코드만의 문제가 아니다

OAuth 로그인은 프론트엔드 코드, 백엔드 callback, OAuth provider 콘솔, 배포 도메인, 환경변수 설정이 함께 맞아야 한다. 사용자의 질문에는 redirect URI/callback URL과 배포 환경 차이를 점검한 흔적이 있다.

### 3. API client는 관심사를 분리해야 한다

Axios client/interceptor, baseURL, token 주입, endpoint, error handling을 분리해야 화면 컴포넌트가 API 세부 구현에 과도하게 묶이지 않는다.

### 4. 응답 타입과 UI 타입을 맞춰야 한다

API payload/response가 컴포넌트 props와 맞지 않으면 TypeScript 오류나 렌더링 문제가 발생한다. 이는 [[03-storybook-ui]]와도 연결된다.

## 문제 → 원인 → 해결 서사 후보

### 문제

API 문서와 실제 endpoint, 인증 토큰 주입, OAuth redirect 설정이 섞이면서 로그인/API 연동이 로컬과 운영 환경에서 다르게 동작할 가능성이 있었다.

### 원인

- Swagger 문서 URL을 실제 API 호출 URL로 오해
- access token이 없을 때 Authorization header가 잘못 구성됨
- OAuth provider 설정과 프론트 redirect/callback 경로 불일치
- API 응답 구조와 프론트 컴포넌트 타입 불일치

### 해결

- baseURL과 endpoint를 분리해 실제 요청 URL을 재정리
- Axios interceptor에서 token 존재 여부를 확인하고 Authorization header를 구성
- OAuth redirect URI/callback URL, 환경변수, 배포 도메인을 함께 점검
- API response 타입과 컴포넌트 props 구조를 맞춰 타입 오류를 줄임

### 결과/학습

API 연동은 “fetch 한 번 호출”이 아니라 문서 해석, 인증, 환경변수, 타입, UI 상태 처리가 연결된 작업이라는 것을 학습했다.

## 이력서 bullet 후보

- Swagger 문서를 기반으로 실제 API endpoint를 식별하고 Axios client/interceptor 구조를 구성했습니다.
- Authorization Bearer token 주입, access token 누락 케이스, OAuth redirect URI/callback URL 설정을 점검하며 인증 연동 문제를 디버깅했습니다.
- API 응답 타입과 컴포넌트 props 구조를 맞춰 데이터 연동 과정의 TypeScript 오류를 개선했습니다.

## 면접 답변 포인트

> API 연동에서 가장 많이 배운 건 Swagger 문서와 실제 endpoint를 구분하는 것, 그리고 인증 흐름이 프론트 코드만으로 끝나지 않는다는 점입니다. Axios baseURL과 interceptor를 정리하고, access token이 없을 때 header가 잘못 들어가는 문제를 확인했습니다. OAuth 로그인도 redirect URI, callback URL, provider 설정, 배포 도메인이 모두 맞아야 한다는 걸 경험했습니다.

## 주의사항

- raw log에 Authorization token 등 민감정보가 일부 포함되어 있었으므로 절대 재출력하거나 문서에 저장하지 않는다.
- 이력서에는 실제 토큰명/도메인 세부 secret 없이 구조와 문제 해결 방식만 쓴다.

## 관련 링크

- [[sosangsangjeom-ai-learning-summary]]
- [[03-storybook-ui]]
- [[04-build-deploy-seo]]
- [[06-interview-stories]]
