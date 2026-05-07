---
type: reflection
date: 2026-05-04
status: active
confidence: user-confirmed
tags: [자기이해, 이력서, 면접, AI활용, AI-native, 에이전트, Claude-Code, Codex, OpenCode, Hermes, Obsidian, Graphify]
source:
  - 2026-05-04 사용자 직접 확인
related_notes:
  - [[agentic-memory-rag-llm-wiki]]
  - [[2026-04-20-llm-wiki-rag-graphify-hybrid]]
  - [[resume-bullets-by-project]]
---

# AI-native 작업 성향과 에이전트 활용 강점 스토리

## 한 줄 정리

사용자는 AI 활용을 가장 자신 있는 강점 중 하나로 느끼며, Claude Code, Codex, OpenCode, Hermes Agent, Obsidian/Graphify 기반 memory workflow 등 여러 AI agent/tool을 직접 써보고 비교하면서 **어떤 작업에 어떤 AI 도구가 적절한지 직관을 쌓아온 AI-native 개발자 지향성**을 가지고 있다.

## 포지셔닝 결론

이 강점은 이력서의 메인 제목으로 “AI 전문가”처럼 내세우기보다는, 프론트엔드/풀스택 프로젝트 경험을 뒷받침하는 **작업 방식의 차별점**으로 녹이는 것이 좋다.

추천 포지셔닝:

> AI 도구를 단순 검색용으로만 쓰지 않고, 코드 이해, 디버깅 방향 검토, 신기술 탐색, 작업 계획 수립, 프로젝트 기억 관리에 활용하는 AI-native 개발자 지향성을 가지고 있습니다.

피해야 할 포지셔닝:

- “AI를 잘합니다”처럼 근거 없는 추상 표현
- “AI로 개발을 자동화했습니다”처럼 과한 표현
- “에이전트 전문가”처럼 검증 범위를 넘는 표현
- 결과물 없이 도구 이름만 나열하는 표현

## 구체 근거

### 1. 여러 AI coding/agent 도구를 직접 비교·사용해본 경험

사용자는 Claude Code, Codex, OpenCode, Hermes Agent 등 여러 에이전트형 도구를 플레이그라운드처럼 직접 사용해보며 도구별 성격을 익혔다.

이력서/면접에서 안전하게 말할 수 있는 범위:

- 여러 AI coding agent를 직접 사용해보며 작업 유형별 적합성을 비교했다.
- 단순 질의응답보다 코드 수정, 계획 수립, 디버깅, 문서화, 장기 memory 관리처럼 역할을 나눠 활용하려 했다.
- 각 도구가 잘하는 작업과 조심해야 할 작업을 대략적으로 구분하는 직관이 있다.

예시 설명:

> Claude Code, Codex, OpenCode, Hermes Agent 등 에이전트형 도구를 직접 사용해보며 코드 수정, 디버깅, 계획 수립, 문서화, 장기 메모리 관리처럼 작업 성격에 따라 AI 도구를 다르게 활용하는 방식을 실험했습니다.

### 2. Obsidian/Graphify 기반 개인 AI memory workflow 구축

현재 Obsidian Vault 자체가 AI 활용 강점의 구체 결과물이다.

확인된 구조:

- raw AI log를 그대로 LLM context에 넣지 않음
- deterministic scan
- compact/monthly/high-signal index
- curated note
- Graphify graph
- 민감정보 스캔
- Git versioning

이력서에서 가장 구체적으로 증명 가능한 AI 활용 결과물이다.

안전한 bullet:

> ChatGPT/Claude 대화 export와 프로젝트 흔적을 Obsidian Markdown, compact index, Graphify graph로 정리하는 개인 AI memory workflow를 구축했습니다.

조금 더 강한 bullet:

> raw AI 대화를 그대로 재사용하지 않고, deterministic scan → compact index → curated note → graph 재생성 구조로 압축해 이력서/면접/프로젝트 회고에 재사용 가능한 개인 knowledge layer를 운영했습니다.

### 3. AI를 디버깅/학습 루프에 활용하는 습관

사용자의 반복 패턴은 다음에 가깝다.

```text
오류 발생
  → 로그/개념 질문
  → 원인 후보 정리
  → 코드/설정 수정
  → 다음 문제로 확장
```

이건 “AI에게 대신 시켰다”가 아니라, AI를 이용해 문제를 구조화하고 학습 속도를 높인 경험으로 표현해야 한다.

좋은 표현:

> 오류 로그 해석, 개념 확인, 디버깅 방향 검토에 AI를 활용해 문제를 구조화하고 해결 속도를 높였습니다.

피해야 할 표현:

> AI가 코드를 만들어줘서 개발했습니다.

### 4. 신기술 탐색과 빠른 적응 성향

사용자는 신기술을 깊게 공식 프로젝트로 완성하지 않더라도, 플레이그라운드처럼 빠르게 만져보며 감을 잡는 성향이 있다.

이건 “얕게 이것저것 했다”가 아니라 다음처럼 표현하면 강점이 된다.

> 새로운 AI 도구나 개발 워크플로우를 작은 실험 단위로 빠르게 검증하고, 실제 프로젝트에 적용 가능한 부분과 아직 위험한 부분을 구분하려는 편입니다.

## 이력서에 넣는 위치

### 1. 기술 스택/Tools 항목

메인 stack과 분리해서 `AI-assisted Workflow` 또는 `AI Tools` 항목으로 넣는 것이 좋다.

예시:

```text
AI-assisted Workflow
- ChatGPT, Claude, Claude Code, Codex, OpenCode, Hermes Agent
- 오류 로그 분석, 코드 이해, 디버깅 방향 검토, 작업 계획 수립, 문서화에 AI 도구 활용
- Obsidian/Graphify 기반 개인 개발 이력 memory workflow 운영
```

### 2. 자기소개서 성격/경험 항목

```text
새로운 도구를 빠르게 실험하고 작업 방식에 맞게 적용하는 것을 좋아합니다. Claude Code, Codex, OpenCode, Hermes Agent 등 AI 기반 개발 도구를 직접 사용해보며 코드 수정, 디버깅, 문서화, 작업 계획 수립처럼 작업 성격에 따라 도구를 다르게 활용하는 방식을 익혔습니다. 또한 Obsidian과 Graphify를 활용해 개발 기록과 AI 대화 기록을 정리하는 개인 memory workflow를 운영하며, 학습과 회고를 재사용 가능한 지식으로 남기고 있습니다.
```

### 3. 프로젝트 설명 하단의 작업 방식

각 프로젝트에 공통으로 붙일 수 있는 한 줄:

> 오류 로그 분석, 개념 확인, 디버깅 방향 검토, 문서화 과정에서 AI 도구를 활용해 문제 해결 속도와 학습 효율을 높였습니다.

## 이력서 bullet 후보

### 안전한 bullet

- ChatGPT, Claude, Claude Code, Codex, OpenCode, Hermes Agent 등 AI 도구를 코드 이해, 디버깅 방향 검토, 신기술 탐색, 작업 계획 수립에 활용했습니다.
- Obsidian과 Graphify를 활용해 AI 대화 기록과 프로젝트 흔적을 curated note와 knowledge graph로 정리하는 개인 개발 memory workflow를 구축했습니다.
- 오류 로그 해석과 개념 확인에 AI를 활용하되, 최종 코드는 직접 검토하고 프로젝트 맥락에 맞게 수정하는 방식으로 학습·개발 속도를 높였습니다.
- 여러 AI agent 도구를 직접 실험하며 코드 수정, 문서화, 검색/리서치, 장기 기억 관리처럼 작업 유형별 적합성을 비교했습니다.

### 확인 후 사용 bullet

- AI-assisted workflow를 활용해 프로젝트 이슈 분석, resume evidence 정리, 면접 story bank 생성까지 연결하는 개인 지식관리 파이프라인을 운영했습니다.
- Claude Code/Codex/OpenCode/Hermes Agent를 비교 사용하며 작은 기능 수정, 디버깅, 문서화, 프로젝트 분석에 맞는 agent 선택 기준을 정리했습니다.

## 면접 Q&A 후보

### Q. AI 도구를 어떻게 활용하나요?

> 단순히 코드를 대신 작성하게 하기보다는, 오류 로그를 해석하거나 원인 후보를 정리하고, 구현 방향을 비교하고, 작업 계획을 쪼개는 데 많이 활용합니다. Claude Code, Codex, OpenCode, Hermes Agent 같은 에이전트형 도구도 직접 사용해보며 코드 수정, 문서화, 프로젝트 분석, 장기 memory 관리처럼 작업 성격에 따라 적합한 도구가 다르다는 감을 익혔습니다.

### Q. AI를 사용하면 본인 실력이 부족해 보일 수 있지 않나요?

> 그래서 AI가 만든 결과를 그대로 쓰기보다, 로그와 코드 흐름을 이해하고 검토하는 방식으로 사용하려고 합니다. 실제로 오류가 생겼을 때 AI에게 해결책만 묻는 것이 아니라 원인 후보, 관련 개념, 수정 후 확인 방법을 함께 정리하면서 학습하는 편입니다. AI는 대체 수단이라기보다 문제를 더 빨리 구조화하게 해주는 도구로 보고 있습니다.

### Q. AI 활용 경험 중 구체적인 결과물이 있나요?

> 개인적으로는 Obsidian과 Graphify를 이용해 ChatGPT/Claude 대화 기록과 프로젝트 흔적을 정리하는 memory workflow를 만들었습니다. raw 대화를 그대로 다시 읽는 대신 compact index, curated note, graph로 압축해서 이력서/면접/회고에 재사용할 수 있게 운영하고 있습니다. 이 과정에서 민감정보 스캔과 Git versioning도 함께 적용하고 있습니다.

## 자소서에 넣을 수 있는 문단

> 저는 새로운 AI 도구와 개발 워크플로우를 실험하는 것을 즐기는 편입니다. Claude Code, Codex, OpenCode, Hermes Agent 같은 에이전트형 도구를 직접 사용해보며 코드 수정, 디버깅, 문서화, 작업 계획 수립처럼 작업 성격에 따라 AI를 다르게 활용하는 방법을 익혔습니다. 또한 Obsidian과 Graphify를 활용해 AI 대화 기록과 프로젝트 흔적을 정리하는 개인 memory workflow를 운영하며, 학습 내용을 일회성 질문으로 끝내지 않고 다시 활용 가능한 지식으로 남기고 있습니다. AI가 만든 결과를 그대로 사용하는 것이 아니라, 원인과 개념을 이해하고 검토하는 방식으로 활용하며 더 빠르게 배우고 문제를 구조화하는 개발자가 되고자 합니다.

## 주의해서 표현할 점

- “AI 전문가”, “AI agent를 잘 다룬다”처럼 검증이 어려운 표현은 피한다.
- “AI로 개발했다”보다 “AI를 활용해 문제를 구조화하고 학습/디버깅 속도를 높였다”가 안전하다.
- 도구 이름을 많이 나열하기보다, 실제 활용 유형을 함께 말한다.
- 결과물 근거는 현재 개인 AI memory workflow가 가장 강하다.
- 메인 프로젝트보다 보조 강점으로 넣는 편이 좋다.

## 추천 최종 포지셔닝 문장

> AI-native한 개발 워크플로우에 익숙하며, Claude Code/Codex/OpenCode/Hermes Agent 등 에이전트형 도구를 직접 실험해 코드 이해, 디버깅, 문서화, 작업 계획 수립에 활용해왔습니다. 특히 Obsidian/Graphify 기반 개인 memory workflow를 구축해 AI 대화와 프로젝트 경험을 재사용 가능한 지식으로 정리하고 있습니다.
