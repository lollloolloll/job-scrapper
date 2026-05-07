---
type: system
status: active
confidence: high
tags: [시작, 사용법, 지식저장소]
---

# 개인 AI 지식저장소

이 Vault는 **내가 직접 매일 기록하지 않아도, Hermes Agent가 작업 내역과 AI 로그를 바탕으로 자동 정리해주는 개인 지식저장소**입니다.

## 핵심 목적

```text
원본 로그/자료는 보관한다.
Hermes가 필요한 내용을 요약한다.
중요한 결정/프로젝트/개념만 정규 노트로 승격한다.
Git으로 변경 이력을 남긴다.
Graphify로 관계 그래프를 만든다.
```

## 내가 먼저 읽을 파일

처음에는 아래 순서로 읽으면 됩니다.

1. [[Home]]
2. [[사용법 - 개인 지식저장소]]
3. [[GIT-운영규칙]]
4. [[09-graphify/Graphify 운영법]]
5. [[03-decisions/2026-05-02-ai-log-memory-pipeline]]
6. [[03-decisions/2026-05-06-memory-long-term-operations-strategy]]

## 역할 분담

| 구성요소 | 역할 |
|---|---|
| Obsidian | 사람이 보는 화면 |
| Markdown 파일 | 실제 지식 저장소 |
| Hermes Agent | 요약, 정리, 폴더 관리, 노트 생성 |
| Git | 변경 이력, diff, rollback, GitHub 백업 |
| Graphify | 정리된 노트의 관계 그래프 생성 |
| raw archive | ChatGPT/Claude/Gemini 원본 보관소 |

## 현재 raw archive 위치

원본 export는 아래에 있습니다.

```text
00-inbox/raw-archives/chatgpt-export/
00-inbox/raw-archives/claude-export/
00-inbox/raw-archives/google-takeout/
```

이 폴더들은 크고 민감할 수 있어서 Git에 올리지 않습니다.

## 현재 추천 운영 방식

```text
1. 내가 Hermes와 작업한다.
2. Hermes가 작업 내용을 Obsidian note로 정리한다.
3. 변경사항은 Git diff로 확인한다.
4. 괜찮으면 commit한다.
5. 정리된 note만 Graphify로 관계 그래프화한다.
```

## 자주 쓰는 요청

```text
최근 작업 내역으로 오늘 daily note 작성해줘.
Claude 로그에서 프로젝트 관련 내용 요약해줘.
Gemini/Google Takeout 인덱스 보고 쓸만한 자료 골라줘.
이번 주 작업 기반으로 reflection note 만들어줘.
새로 만든 note들 Git commit 해줘.
curated notes 기준으로 graph 다시 만들어줘.
```

## 중요한 원칙

- raw archive는 직접 수정하지 않습니다.
- 사람이 읽을 파일은 한글로 작성합니다.
- 영어 파일은 agent 전용 지시/설정 파일로만 둡니다.
- Graphify 결과는 원본이 아니라 인덱스입니다.
- 중요한 사실은 원문/요약/결정 노트 중 어디에서 왔는지 추적 가능해야 합니다.
