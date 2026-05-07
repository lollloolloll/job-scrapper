---
type: decision
status: active
confidence: high
tags: [ai-logs, graphify, claude, gemini, obsidian, git]
---

# AI 로그 기반 자동 지식저장소 운영 전략

## 결론

Claude/Gemini/ChatGPT export는 **원본 raw archive로 보관**하고, Graphify에는 원본 전체가 아니라 **인덱스 → 요약 → 승격된 curated note**를 넣는다.

```text
raw export 전체
  = 00-inbox/raw-archives/ 아래 보관, Git 제외

agent가 만든 인덱스/요약
  = 08-summaries/ 아래 저장, Git 포함

중요한 결정/프로젝트/개념/패턴
  = 03-decisions / 04-projects / 06-concepts / 02-reflections 로 승격, Git 포함

Graphify
  = curated notes 중심으로 실행
```

---

## 현재 raw archive 위치

```text
00-inbox/raw-archives/chatgpt-export/
00-inbox/raw-archives/claude-export/
00-inbox/raw-archives/google-takeout/
```

이 폴더들은 `.gitignore`에 포함되어 있으므로 기본적으로 GitHub에 올라가지 않는다.

---

## Claude 로그 판단

Claude export는 구조가 명확하다.

```text
00-inbox/raw-archives/claude-export/conversations.json
```

구조:

```text
conversation list
  - uuid
  - name
  - summary
  - created_at
  - updated_at
  - chat_messages
```

따라서 Claude 로그는 자동 인덱싱/요약에 적합하다.

추천 처리:

```text
1. scripts/index-ai-logs.py 로 월별/긴 대화/최근 대화 인덱스 생성
2. 중요한 달 또는 긴 대화만 선택해 요약
3. 프로젝트/결정/개념으로 승격
```

생성된 인덱스:

```text
08-summaries/ai-log-index/claude-index.md
```

---

## Gemini/Google Takeout 판단

Google Takeout은 매우 크고 섞여 있다.

```text
Google Photos
Drive
NotebookLM
Gemini app activity
audio/images/videos
pdf/html/json
```

따라서 전체를 Graphify에 직접 넣으면 안 된다.

Gemini 관련 데이터는 일부 있지만, `내 활동/Gemini 앱` 쪽은 이미지/음성/zip 중심으로 보인다. 텍스트 대화 원문으로 바로 쓰기보다는 먼저 inventory/index를 보고 선별해야 한다.

생성된 인덱스:

```text
08-summaries/ai-log-index/google-gemini-index.md
```

추천 처리:

```text
1. NotebookLM / Gemini / AI Studio 관련 텍스트 후보만 선별
2. 이미지/음성/영상은 지금 단계에서는 제외
3. 텍스트 후보만 요약
4. 중요한 개념/프로젝트/전략만 정규 note로 승격
```

---

## Graphify 실행 대상

처음 Graphify 대상으로 좋은 폴더:

```text
03-decisions/
04-projects/
06-concepts/
08-summaries/
```

처음 Graphify 대상으로 나쁜 폴더:

```text
00-inbox/raw-archives/
```

이유:

- 너무 큼
- 이미지/음성/영상이 많음
- 중복/잡음이 많음
- token 비용이 커짐

---

## Agent가 자동으로 Obsidian 작성하는 흐름

사용자가 기록을 잘 하지 않는다는 전제에서는, agent가 다음 일을 한다.

```text
1. 작업/대화 로그를 raw archive 또는 session history에서 확인
2. 하루/주 단위로 요약 note 생성
3. 반복 패턴, 프로젝트 변경, 의사결정을 추출
4. 정규 폴더로 승격
5. Git snapshot 생성
6. 필요하면 Graphify update 실행
```

사용자가 요청할 수 있는 명령 예시:

```text
최근 Hermes 작업 내역으로 오늘 daily note 작성해줘.
Claude/Gemini 로그에서 최근 프로젝트 관련 내용 요약해줘.
이번 주 AI 작업 내역을 reflection note로 만들어줘.
새로 생긴 summary/decision만 Git commit 해줘.
curated notes 기준으로 Graphify 돌려줘.
```

---

## Git의 역할

Git은 memory backend가 아니라 **diff/버전관리/agent 검토 안전장치**다.

```text
agent가 Obsidian을 작성
  ↓
git diff로 사람이 변경 확인
  ↓
git commit으로 스냅샷 저장
  ↓
GitHub private repo로 백업 가능
```

---

## 현재 상태

- Raw archive 정리 완료
- `.gitignore` 생성 완료
- 로컬 Git 초기화 완료
- AI 로그 인덱스 생성 스크립트 생성 완료
- Claude/Gemini 인덱스 생성 완료
- Graphify 실행 스크립트 존재
- 아직 실제 `graphify-out/graph.json`은 생성되지 않음

즉, Graphify를 실행할 준비는 됐지만, 현재 graph node가 그려진 상태는 아니다.
