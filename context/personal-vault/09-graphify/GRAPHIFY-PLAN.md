---
type: system
status: active
confidence: high
tags: [graphify, plan, token]
---

# Graphify 계획

## 결론

전체 raw archive를 바로 Graphify에 넣지 않는다.  
먼저 사람이 읽을 수 있는 요약/결정/프로젝트/개념 노트를 만들고, 그 curated note들을 Graphify에 넣는다.

## 이유

현재 Vault에는 대용량 export가 포함되어 있다.

```text
ChatGPT export: 약 421MB
Claude export: 약 38MB
Google/Gemini Takeout: 약 6GB
```

이 전체를 semantic Graphify에 넣으면 비용과 시간이 크고, 노이즈도 많다.

## 추천 입력 폴더

```text
03-decisions/
04-projects/
06-concepts/
08-summaries/
```

## 비추천 입력 폴더

```text
00-inbox/raw-archives/
attachments/
graphify-out/
```

## 현재 가능한 graph

현재는 lightweight graph가 생성되어 있다.

```text
graphify-out/graph.json
graphify-out/graph.html
graphify-out/GRAPH_REPORT.md
```

다시 생성하려면:

```bash
python3 scripts/build-curated-graph.py
```

## semantic Graphify를 돌릴 때

Hermes에게 이렇게 요청한다.

```text
curated notes 기준으로 semantic Graphify 돌려줘.
```

또는 특정 폴더만 지정한다.

```text
03-decisions와 08-summaries 기준으로 Graphify 돌려줘.
```
