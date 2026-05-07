---
type: decision
date: 2026-05-03
status: active
confidence: medium
tags: [decision, frontend, architecture]
---

# 프론트 로직을 구조 설계 문제로 다룬다

## 결정

프론트엔드 작업을 “화면을 만드는 일”로만 보지 않고, API 계층·상태 관리·컴포넌트 책임·라우팅을 포함한 구조 설계 문제로 정리한다.

## 이유

2025-08 이후 `프론트 로직 설계`, `React Query`, `서버컴포넌트`, `FSD`, `API 역할` 관련 신호가 반복된다. 이는 프로젝트가 커질수록 UI 코드도 아키텍처 관점이 필요하다는 학습 흐름이다.

## 결과

프론트엔드 포트폴리오 설명에서 “페이지 구현”보다 “기능 단위 구조화와 데이터 흐름 관리”를 강조한다.

## 근거 source
- `08-summaries/ai-log-index/ai-log-records-compact.json`
- `08-summaries/ai-log-index/chatgpt-monthly-index.md`
- `08-summaries/ai-log-index/claude-monthly-index.md`
