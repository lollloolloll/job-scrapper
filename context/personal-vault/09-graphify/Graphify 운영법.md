---
type: system
status: active
confidence: high
tags: [graphify, graph, obsidian, 사용법]
---

# Graphify 운영법

## 현재 상태

현재 Vault에는 두 종류의 graph 작업 흐름이 있다.

## 1. Lightweight curated graph

명령:

```bash
python3 scripts/build-curated-graph.py
```

출력:

```text
graphify-out/graph.json
graphify-out/graph.html
graphify-out/GRAPH_REPORT.md
graphify-out/curated-extract.json
```

특징:

```text
- LLM/API 비용 없음
- Markdown frontmatter tags, headings, wiki links, 폴더 구조 기반
- 즉시 node/edge를 볼 수 있음
- 완전한 의미 추론은 아님
```

사용 목적:

```text
- Vault 구조가 어떻게 연결되어 있는지 보기
- Agent가 최근 정리한 note들이 어디에 붙는지 확인
- Graphify 환경 동작 확인
```

현재 이 graph는 생성되어 있다.

---

## 2. Full semantic Graphify

Hermes에게 요청하는 방식:

```text
curated notes 기준으로 semantic graphify 돌려줘.
```

또는 명시적으로:

```text
/graphify "/workspace/_memory/Obsidian Vault/03-decisions" --no-viz
/graphify "/workspace/_memory/Obsidian Vault/08-summaries" --no-viz
```

특징:

```text
- LLM이 문서 내용을 읽고 entity/relationship을 추출
- EXTRACTED / INFERRED / AMBIGUOUS edge가 생김
- 비용/시간이 듦
- raw archive 전체에는 바로 돌리지 말 것
```

추천 입력:

```text
03-decisions/
04-projects/
06-concepts/
08-summaries/
```

비추천 입력:

```text
00-inbox/raw-archives/
```

---

## 질문: 폴더 정리는 누가 하나?

Graphify는 폴더를 정리하지 않는다.

```text
Graphify = 이미 있는 파일을 읽어서 graph를 만든다.
Hermes/Agent = raw를 분류하고 요약하고 Obsidian note를 만든다.
사용자 = 필요하면 최종 방향만 결정한다.
Git = 변경 이력을 남긴다.
```

즉 폴더 정리는 agent가 한다. Graphify는 정리된 결과를 인덱싱한다.

---

## 추천 루틴

```text
1. raw log/export를 00-inbox/raw-archives/에 둔다.
2. agent가 scripts/index-ai-logs.py로 인덱스를 만든다.
3. agent가 중요한 내용을 08-summaries/로 요약한다.
4. 결정/프로젝트/개념은 정규 폴더로 승격한다.
5. python3 scripts/build-curated-graph.py 로 lightweight graph를 갱신한다.
6. 필요할 때만 full semantic Graphify를 돌린다.
7. scripts/git-snapshot.sh 로 commit한다.
```
