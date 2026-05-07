---
type: decision
date: 2026-05-03
status: active
confidence: medium
tags: [decision, ai-memory, rag, graphify]
---

# LLM Wiki/RAG/Graphify를 혼합한다

## 결정

개인 지식 저장소는 한 가지 도구에만 의존하지 않고, raw archive, compact index, Obsidian curated note, Graphify graph를 역할별로 나누어 사용한다.

## 이유

`LLM wiki vs RAG`, `Obsidian`, `Graphify`, `AI memory` 관련 질문을 통해 사용자는 토큰 비용, 검색성, 사람이 읽는 정리, 원본 보존 사이의 균형을 중요하게 본다.

## 결과

앞으로도 raw를 직접 graphify하지 않고, 먼저 deterministic index와 curated note로 압축한 뒤 graph를 갱신한다.

## 근거 source
- `08-summaries/ai-log-index/ai-log-records-compact.json`
- `08-summaries/ai-log-index/chatgpt-monthly-index.md`
- `08-summaries/ai-log-index/claude-monthly-index.md`
