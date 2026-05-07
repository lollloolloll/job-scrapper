---
type: project
date: 2026-05-02
status: evidence-draft
confidence: medium-high
tags: [resume, project, petmily, spring-boot, react, vite, mybatis, troubleshooting]
source_paths:
  - /host/users/skdhu/IdeaProjects/project/petmily
  - /host/users/skdhu/OneDrive/사진/바탕 화면/궁금증 문서.txt
  - /host/users/skdhu/OneDrive/사진/바탕 화면/프로젝트 승은코드찾기.txt
---

# Petmily 웹 풀스택 프로젝트

## 한 줄 요약

국비학원 6개월 수강 후 진행한 반려동물/동물병원/커뮤니티 성격의 웹 풀스택 프로젝트입니다. 프론트엔드 React/Vite와 백엔드 Spring Boot/MyBatis 기반으로 게시판, 댓글, 회원, 지도/장소, 채팅, 다이어리, 파일 업로드/S3 연동 관련 기능을 다룬 흔적이 확인됩니다.

## 근거

- 원본 코드: `/host/users/skdhu/IdeaProjects/project/petmily`
- 프론트엔드: `frontend/package.json`, `frontend/src/*`
- 백엔드: `backend/build.gradle`, `backend/sql/*`
- 트러블슈팅 문서:
  - `궁금증 문서.txt`
  - `프로젝트 승은코드찾기.txt`

## 기술 스택 후보

### 프론트엔드

- React
- Vite
- JavaScript / JSX
- Chakra UI
- Axios
- FullCalendar
- STOMP/WebSocket 관련 패키지
- Kakao Map 관련 코드 흔적

### 백엔드

- Java 21
- Spring Boot 3.2.6
- Spring Security
- OAuth2 Client / Resource Server
- MyBatis
- JPA 일부 의존성
- JWT
- AWS S3 SDK
- MariaDB 또는 MySQL 계열로 추정되는 SQL/DB 연동

## 확인된 기능 영역

코드 경로와 문서 기준으로 다음 기능을 다룬 흔적이 있습니다.

- 회원 가입/로그인/OAuth 로그인
  - `frontend/src/page/member/MemberSignup.jsx`
  - `frontend/src/page/member/MemberLogin.jsx`
  - `frontend/src/page/member/OAuthLogin.jsx`
- 게시판 CRUD
  - `frontend/src/page/board/BoardList.jsx`
  - `BoardView.jsx`, `BoardWrite.jsx`, `BoardEdit.jsx`
- 게시판 댓글
  - `frontend/src/component/board/BoardComment*`
- 장소/동물병원/지도 기능
  - `frontend/src/page/place/PlaceMap*.jsx`
  - `backend/sql/hospital.sql`
- 채팅/친구 채팅
  - `frontend/src/component/chat/*`
  - `backend/sql/chat.sql`
- 다이어리
  - `frontend/src/page/diary/*`
  - `backend/sql/diary.sql`
- 파일 업로드 및 S3 관련 문제 해결
  - `프로젝트 승은코드찾기.txt`의 파일 첨부/S3 항목

## 문제 해결 경험 후보

### 1. 프론트 렌더링/컴포넌트 export 문제

- 문제: `MemberSignup` 컴포넌트 렌더링이 되지 않음.
- 원인/해결: `export default MemberSignup`와 named export/import 방식 불일치가 있었고, export 방식을 수정해 해결한 기록이 있음.
- 이력서 표현 후보:
  - React 컴포넌트 export/import 방식 불일치로 발생한 렌더링 문제를 추적하고 수정했습니다.

### 2. Spring Security 설정으로 프론트 요청이 백엔드에 도달하지 않는 문제

- 문제: 프론트엔드에서 보낸 요청을 백엔드가 받지 못함.
- 원인/해결: Security 설정 문제로 기록되어 있음. 최종 해결은 강사 도움을 받은 것으로 명시되어 있어, 이력서에는 단독 해결로 과장하면 안 됩니다.
- 표현 방식:
  - Spring Security 설정이 API 요청 흐름에 미치는 영향을 디버깅하며 인증/인가 설정과 CORS/요청 허용 범위를 학습했습니다.

### 3. 의존성 주입 및 서버 500 에러

- 문제: 서버 사이드 500 에러.
- 해결 기록: 의존성 주입 시 `final BoardMapper mapper;` 형태로 선언해 해결.
- 의미:
  - Spring 생성자 주입/불변 의존성 선언에 대한 이해로 연결 가능.

### 4. React `.map()` 렌더링 문법 문제

- 문제: 게시판 read 시 게시글이 화면에 표시되지 않음.
- 원인/해결: JSX에서 `.map()` 콜백의 반환 영역을 `{}`가 아니라 `()`로 감싸야 반환 렌더링이 되는 케이스를 확인.
- 표현 후보:
  - JSX 렌더링 문법과 배열 매핑 반환 구조를 점검해 게시글 목록 표시 문제를 해결했습니다.

### 5. `useEffect` 비동기/로딩 상태 문제

- 문제: 데이터 fetch 전 화면에서 board/null 관련 오류가 발생.
- 해결 기록: `loading` 상태와 null guard 처리 필요성을 학습.
- 표현 후보:
  - 비동기 데이터 로딩 과정에서 null 상태를 고려한 조건부 렌더링과 로딩 UI를 적용했습니다.

### 6. URL/searchParams/navigate 경로 문제

- 문제: 페이지네이션 버튼 클릭 후 `searchParams` 변경은 되었지만 axios 요청이 다시 발생하지 않음.
- 원인/해결: 현재 렌더링 경로가 `/board`인데 `navigate('/?...')`로 이동해 라우팅 기준이 맞지 않았고, `navigate('/board?...')`로 수정해 해결.
- 표현 후보:
  - React Router의 URL query 갱신과 컴포넌트 렌더링 경로 관계를 분석해 페이지네이션 요청 갱신 문제를 해결했습니다.

### 7. MyBatis 반환 타입/바인딩 문제

- 문제: 페이징/검색 구현 중 Mapper 반환 타입과 파라미터 바인딩 문제 발생.
- 해결 기록:
  - `Object` 대신 `List<Board>`처럼 명확한 반환 타입 지정.
  - JavaBean 필드명, SQL 컬럼명, axios 요청 변수명을 일치시켜 매핑 문제 해결.
- 표현 후보:
  - MyBatis Mapper의 반환 타입과 DTO 필드명/SQL 파라미터 바인딩을 정리해 게시판 조회/댓글 기능의 데이터 매핑 오류를 해결했습니다.

### 8. 파일 업로드/FormData/S3 연동 문제

- 문제:
  - 파일 input에서 `value`를 사용해 파일 객체가 넘어가지 않음.
  - axios 요청 시 파일 객체가 비어 있음.
  - 10MB 이상 파일 요청이 서버에서 막힘.
  - S3 저장 파일 조회 시 설정 오류 발생.
- 해결 기록:
  - `e.target.files` 사용.
  - `FormData` 및 `postForm` 사용.
  - Spring multipart max-request-size/max-file-size 설정 추가.
  - `@Value` placeholder 오타 수정.
- 표현 후보:
  - React 파일 입력, FormData 전송, Spring multipart 설정, S3 경로 설정을 점검해 파일 업로드/조회 문제를 단계적으로 해결했습니다.

### 9. Java 문자열 비교/SQL JOIN 컬럼 충돌

- 문제:
  - Java에서 `boardType == "전체"` 비교로 조건이 제대로 작동하지 않음.
  - board/member JOIN 후 `id` 컬럼 충돌.
- 해결:
  - 문자열 비교는 `.equals()` 사용.
  - SQL에서 테이블/컬럼 소속을 명확히 지정.
- 표현 후보:
  - Java 문자열 비교 방식과 SQL JOIN 컬럼 모호성 문제를 디버깅해 검색/상세조회 로직을 수정했습니다.

## 이력서 bullet 초안

- React/Vite와 Spring Boot 기반 반려동물 커뮤니티 웹 프로젝트에서 게시판, 댓글, 회원, 지도/장소, 파일 업로드 기능을 구현하며 프론트엔드-백엔드 연동 흐름을 경험했습니다.
- Axios 요청 방식, URL query, React Router, `useEffect` 로딩 상태를 점검해 게시글 목록/상세/페이지네이션 렌더링 문제를 해결했습니다.
- MyBatis Mapper 반환 타입, JavaBean 필드명, SQL 파라미터 바인딩을 정리해 게시판/댓글 데이터 매핑 오류와 NullPointerException을 디버깅했습니다.
- 파일 업로드 과정에서 File 객체 처리, FormData 전송, Spring multipart 제한, S3 경로 설정을 단계적으로 확인해 업로드/조회 문제를 해결했습니다.

## 면접에서 말할 수 있는 스토리 후보

> Petmily 프로젝트에서 게시판과 댓글 기능을 구현하면서 프론트에서 보낸 값이 백엔드 DTO와 MyBatis Mapper까지 정확히 이어지지 않아 NullPointerException과 매핑 오류가 반복되었습니다. 처음에는 단순 API 오류로 봤지만, axios 요청의 key 이름, JavaBean 필드명, SQL Mapper의 파라미터명이 모두 맞아야 한다는 점을 확인했고, 각 계층의 변수명을 맞춰 문제를 해결했습니다. 이 경험을 통해 프론트-백엔드 연동 문제는 한쪽 코드만 보는 것이 아니라 요청 payload, controller, DTO, mapper, SQL까지 이어서 추적해야 한다는 것을 배웠습니다.

## 주의 / 사용자 확인 필요

- 정확한 프로젝트 기간, 팀 규모, 본인 담당 범위는 추가 확인 필요.
- 일부 문제는 강사 또는 팀원의 도움으로 해결한 것으로 기록되어 있으므로, 단독 해결처럼 과장하면 안 됩니다.
- Petmily의 백엔드 Java 실제 도메인 코드가 현재 스캔에서는 많이 보이지 않고 SQL과 프론트 코드 중심으로 확인되었습니다. 백엔드 코드 위치/브랜치가 별도로 있으면 추가 확인이 필요합니다.
