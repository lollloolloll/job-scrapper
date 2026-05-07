---
type: system
status: active
confidence: high
tags: [schema, 규칙, 지식저장소]
---

# 지식저장소 스키마

이 문서는 Vault 안의 파일을 어떤 규칙으로 작성하고 정리할지 정의합니다.

## 1. 기본 원칙

```text
raw는 보존한다.
요약은 별도 파일로 만든다.
결정은 decision note로 남긴다.
프로젝트 맥락은 project note로 정리한다.
반복 패턴은 concept/reflection note로 승격한다.
```

## 2. 파일 언어 규칙

사람이 읽는 문서는 기본적으로 **한글**로 작성합니다.

영어로 유지해도 되는 파일은 다음처럼 agent/tool이 읽는 파일입니다.

```text
AGENTS.md
스크립트 내부 주석 일부
도구가 생성한 원본 report 일부
외부 export 원본
```

## 3. Frontmatter 규칙

가능하면 Markdown 상단에 아래 형식을 둡니다.

```yaml
---
type: decision | project | summary | concept | reflection | daily | system
status: draft | active | archived
confidence: low | medium | high
tags: []
---
```

## 4. 폴더별 규칙

### 00-inbox

미처리 자료와 raw archive를 둡니다.

```text
00-inbox/raw-archives/
```

raw archive는 직접 수정하지 않습니다.

### 01-daily

하루 단위 기록입니다. 사용자가 직접 쓰지 않아도 Hermes가 작업 내역으로 생성할 수 있습니다.

### 02-reflections

반복 패턴, 주간/월간 회고, 자기이해를 정리합니다.

### 03-decisions

중요한 결정과 그 이유를 기록합니다.

포함할 내용:

```text
결정
맥락
대안
선택 이유
예상 결과
나중에 재검토할 조건
```

### 04-projects

프로젝트별 목표, 상태, 방향, 의사결정을 정리합니다.

### 05-people

사람/관계/커뮤니케이션 맥락을 정리합니다.

### 06-concepts

반복해서 등장하는 개념, 사고 모델, 문제 해결 패턴을 정리합니다.

### 07-questions

아직 답하지 않은 질문, 나중에 탐구할 주제를 둡니다.

### 08-summaries

Hermes가 만든 요약, AI 로그 인덱스, 기간별 정리 파일을 둡니다.

### 09-graphify

Graphify 운영법, 계획, 보고서를 둡니다.

### 10-preferences

개인 취향, 작업 스타일, 학습 방식, 프로젝트 선호, 에너지 패턴을 정리합니다.

### 11-career-strategy

진로 선택지, 직무 적합도, 지원 전략, 커리어 포지셔닝을 정리합니다.

### 12-radar

채용공고, 기술 트렌드, 사업 아이디어 등 Hermes가 주기적으로 수집하거나 사용자가 가져온 외부 정보를 정리합니다. 원문은 raw/index로 분리하고, 사람이 읽을 판단은 briefing으로 저장합니다.

## 5. Raw archive 처리 규칙

raw archive는 source of truth이지만 active memory가 아닙니다.

```text
raw archive
  ↓
index
  ↓
summary
  ↓
curated note
  ↓
Graphify
```

전체 raw archive를 Graphify에 바로 넣지 않습니다.

## 6. Git 규칙

Git에 올릴 것:

```text
Markdown 문서
템플릿
스크립트
운영 규칙
요약/결정/프로젝트/개념 노트
```

Git에 올리지 않을 것:

```text
00-inbox/raw-archives/
attachments/
graphify-out/
.env
키/토큰/비밀 파일
이미지/음성/영상/zip 원본
```

## 7. Agent 편집 규칙

Hermes Agent는 다음을 해도 됩니다.

```text
요약 파일 생성
decision/project/concept/reflection note 생성
폴더 정리
Git diff 확인
Git commit 생성
Graphify graph 갱신
```

주의할 점:

```text
raw archive 원본은 수정하지 않는다.
민감정보는 요약에 그대로 옮기지 않는다.
사람이 읽을 운영 문서는 한글로 쓴다.
큰 변경 후에는 Git commit을 남긴다.
```
