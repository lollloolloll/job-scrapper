---
type: decision
status: active
confidence: high
tags: [memory, obsidian, graphify, hermes]
---

# 개인 메모리 아키텍처 결정

## 결정

개인 지식저장소는 다음 구조로 운영한다.

```text
Hermes memory
  = 작고 안정적인 부트 정보 / 사용자 선호 / 환경 정보

Obsidian Vault
  = 사람이 보고 수정할 수 있는 Markdown 원본 저장소

Graphify
  = 정리된 Markdown을 관계 그래프로 만드는 인덱스

Git
  = 변경 이력, diff, rollback, GitHub 백업
```

## 이유

Hermes memory에 모든 내용을 넣으면 용량이 작고 관리가 어렵다.  
반대로 raw archive 전체를 매번 읽으면 토큰 비용이 너무 크다.

그래서 원본은 Obsidian에 보관하고, Hermes는 필요한 부분만 읽고, Graphify는 정리된 노트를 관계 그래프로 만든다.

## 운영 원칙

```text
raw archive는 보존한다.
Hermes가 요약과 정리를 만든다.
중요한 내용만 decision/project/concept note로 승격한다.
Graphify는 curated note 중심으로 돌린다.
Git으로 변경 이력을 남긴다.
```

## 결과

이 구조는 사람이 이해할 수 있고, agent가 자동 처리하기도 쉽고, 나중에 GitHub/private repo로 백업하기도 좋다.
