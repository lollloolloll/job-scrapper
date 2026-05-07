---
type: summary
date: 2026-05-02
status: draft
confidence: high
tags: [raw-archive, dates, ai-log, obsidian, pipeline]
source_paths:
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/google-takeout
---

# Raw 데이터 날짜 메타데이터 조사

## 결론

raw 데이터에서 작성일/생성일은 상당 부분 알 수 있다. 특히 ChatGPT와 Claude export는 conversation 단위와 message 단위 날짜가 있어 daily/reflections/decisions/concepts/questions를 날짜별로 재구성하기 좋다.

## ChatGPT export

- 위치: `00-inbox/raw-archives/chatgpt-export/conversations-*.json`
- 파일 수: 32개 split JSON
- conversation 수: 3,108개
- message create_time 보유 수: 49,485개
- conversation date fields:
  - `create_time`
  - `update_time`
- 확인된 범위: 2023-01-06 ~ 2026-04-20
- 월별 conversation 상위 예시:
  - 2025-04: 247
  - 2025-03: 198
  - 2024-06: 186
  - 2025-05: 169
  - 2025-10: 156
  - 2024-11: 152
  - 2026-03: 131

## Claude export

- 위치: `00-inbox/raw-archives/claude-export/conversations.json`
- conversation 수: 521개
- message date 보유 수: 5,777개
- conversation date fields:
  - `created_at`
  - `updated_at`
- 확인된 범위: 2024-03-30 ~ 2026-04-30
- 월별 conversation 상위 예시:
  - 2025-11: 57
  - 2025-03: 49
  - 2026-01: 49
  - 2025-08: 46
  - 2026-04: 40
  - 2025-10: 36

## Google Takeout

- 위치: `00-inbox/raw-archives/google-takeout`
- 날짜를 알 수 있는 주요 소스:
  - Google Photos supplemental metadata: `photoTakenTime`, `creationTime`
  - 사진/영상 파일명: `YYYYMMDD_HHMMSS` 패턴
  - Fitness session JSON: `startTime`, `endTime`
  - 일부 내 활동/NotebookLM/Drive 자료는 별도 구조 확인 필요
- 확인된 category 예시:
  - Drive 관련 파일
  - Fitness
  - Google Photos
  - NotebookLM
  - 내 활동
  - YouTube/YouTube Music
  - Chrome

## Vault 현재 상태

- `01-daily`: README 포함 2개
- `02-reflections`: README 중심, 아직 거의 비어 있음
- `03-decisions`: 일부 아키텍처 결정 노트 존재
- `05-people`: README 중심, 비어 있음
- `06-concepts`: README 중심, 비어 있음
- `07-questions`: README 중심, 비어 있음

## 추천 처리 순서

1. `08-summaries/ai-log-index/` 확장
   - raw를 바로 daily로 뿌리기 전에 월별/일별 색인을 먼저 만든다.
   - ChatGPT/Claude conversation title, date, source, keyword, estimated topic을 deterministic하게 추출한다.

2. `01-daily/`는 모든 날짜를 만들지 말고 “의미 있는 날”만 생성
   - conversation이 많거나 프로젝트/진로/결정 관련 활동이 있는 날만 daily note 작성.
   - 나머지는 월별 index에만 둔다.

3. `03-decisions/` 먼저 채우기
   - 이력서, 프로젝트 방향, 아키텍처, 진로, 학습 방식처럼 시간이 지나도 가치가 큰 결정을 우선 승격한다.

4. `06-concepts/` 채우기
   - 반복적으로 질문한 개념: Git flow, Next.js App Router, Swagger/API, OAuth, Storybook, 배포/SEO, Graphify/LLMWiki 등.

5. `07-questions/` 채우기
   - 반복되었지만 아직 답이 덜 정리된 질문, 앞으로 면접/포트폴리오에서 확인해야 할 질문을 모은다.

6. `02-reflections/`는 월별로 생성
   - “그 달에 무엇을 많이 물어봤고 무엇을 배웠는지”를 요약한다.
   - daily보다 token 효율이 좋다.

7. `05-people/`은 조심스럽게 생성
   - raw log에서 사람 이름/팀원/회사/기관이 나오더라도 개인정보성/맥락 오해 위험이 있어, 확실히 반복 등장하고 프로젝트 맥락이 분명한 경우만 만든다.
   - 민감정보나 사적 정보는 보존하지 않는다.

## 날짜 처리 원칙

- ChatGPT `create_time`, Claude `created_at`은 conversation 시작일로 사용.
- message 단위 날짜는 세부 timeline이 필요할 때만 사용.
- Google Photos는 `photoTakenTime`을 우선하고, 없으면 filename datetime, 그 다음 `creationTime`을 사용.
- 날짜가 불확실하면 `confidence: low` 또는 `date_estimated: true`를 frontmatter에 남긴다.

## 안전 원칙

- raw archive는 수정하지 않는다.
- raw archive 전체를 Graphify/LLM에 통째로 넣지 않는다.
- 민감정보/API 키/토큰/비밀번호/Authorization header는 절대 보존하지 않는다.
- Obsidian에는 사람이 읽을 수 있는 curated note만 저장한다.
