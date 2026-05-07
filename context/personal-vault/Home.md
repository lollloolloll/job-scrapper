---
type: home
status: active
confidence: high
tags: [home, 시작, 지식저장소]
---

# Home

이곳은 개인 AI 지식저장소의 시작 페이지입니다.

## 지금 상태

세팅은 기본 완료 상태입니다.

```text
Obsidian Vault 생성 완료
폴더 구조 생성 완료
ChatGPT / Claude / Gemini raw archive 정리 완료
Git 로컬 버전관리 초기화 완료
첫 commit 완료
AI 로그 인덱스 생성 완료
lightweight graph 생성 완료
```

## 내가 읽으면 되는 핵심 문서

### 1. 전체 사용법

[[사용법 - 개인 지식저장소]]

가장 먼저 읽을 파일입니다. 이 Vault를 어떻게 쓰는지 사람이 이해하기 쉽게 정리되어 있습니다.

### 2. Git 운영

[[GIT-운영규칙]]

Hermes가 자동으로 노트를 작성할 때, 변경사항을 diff/commit으로 관리하는 규칙입니다.

### 3. Graphify 운영

[[09-graphify/Graphify 운영법]]

Graphify가 무엇을 하고, 언제 어떤 폴더에 돌리면 되는지 설명합니다.

### 4. AI 로그 운영 결정

[[03-decisions/2026-05-02-ai-log-memory-pipeline]]

ChatGPT/Claude/Gemini 로그를 어떻게 지식저장소에 편입할지 결정한 문서입니다.

### 5. GPT 대화내역 검토

[[08-summaries/gpt-history-review]]

기존 ChatGPT 대화내역을 raw로 넣을지, 요약해서 넣을지 검토한 문서입니다.

### 6. 메모리 장기 운용 전략

[[03-decisions/2026-05-06-memory-long-term-operations-strategy]]

기존 Vault를 확장해 개인 취향, 진로 전략, 자동 리서치, 6개월 raw 데이터 갱신, Hermes 자체 세션 기록을 어떻게 다룰지 정리한 문서입니다.

## 폴더 빠른 설명

| 폴더 | 의미 |
|---|---|
| 00-inbox | 미처리 자료, raw archive |
| 01-daily | 하루 단위 기록 |
| 02-reflections | 회고, 패턴 분석 |
| 03-decisions | 중요한 결정 |
| 04-projects | 프로젝트별 맥락 |
| 05-people | 사람/관계 정보 |
| 06-concepts | 개념, 사고 모델 |
| 07-questions | 열린 질문 |
| 08-summaries | Hermes가 만든 요약 |
| 09-graphify | Graphify 운영 문서 |
| 10-preferences | 개인 취향, 작업 스타일, 성향 분석 |
| 11-career-strategy | 진로 선택지, 직무 적합도, 지원 전략 |
| 12-radar | 채용공고, 기술 트렌드, 사업 아이디어 자동 수집/요약 |
| templates | Obsidian 템플릿 |
| scripts | 유지관리 스크립트 |

## Hermes에게 요청하는 방식

```text
오늘 작업 내역 정리해서 daily note 만들어줘.
최근 대화 기반으로 decision note 만들어줘.
Claude 로그에서 긴 대화 Top 10 요약해줘.
Google/Gemini 데이터 중 지식저장소에 넣을 후보 골라줘.
변경사항 Git diff 보여줘.
변경사항 commit 해줘.
Graphify graph 다시 만들어줘.
```
