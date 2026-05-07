---
type: decision
status: active
confidence: high
date: 2026-05-06
tags: [memory, vault, obsidian, raw-archive, hermes, graphify, career-strategy, 개인지식저장소]
---

# 메모리 장기 운용 전략

## 한 줄 결정

기존 Obsidian Vault를 새로 쪼개기보다, 현재 Vault를 **프로젝트·이력서·자기이해·진로전략·자동 리서치가 연결되는 개인 지식 운영체제**로 확장한다. 단, raw 데이터, curated knowledge, graph/index, 자동 수집 결과는 폴더와 Git 정책으로 분리한다.

관련 문서:

- [[README]]
- [[SCHEMA]]
- [[Home]]
- [[03-decisions/2026-05-02-ai-log-memory-pipeline]]
- [[08-summaries/gpt-history-review]]
- [[09-graphify/Graphify 운영법]]

## 배경

현재 Vault는 주로 이력서, 프로젝트, AI 로그 인덱스, Graphify 중심으로 구성되어 있다. 앞으로는 다음 영역까지 확장하고 싶다.

- 개인 취향 분석
- 작업 스타일 분석
- 진로 고민과 선택지 비교
- 채용공고/기술 트렌드/사업 아이디어 자동 수집
- AI 대화와 프로젝트 흔적을 장기적으로 재사용 가능한 지식으로 전환
- Hermes 자체 대화 기록까지 포함한 장기 작업 기억 구축

이 확장은 기존 프로젝트/이력서 Vault와 분리하기보다 연결하는 편이 더 가치가 크다. 프로젝트 경험, 취향, 진로, 사업 아이디어, AI 활용 방식은 서로 강하게 연결되어 있기 때문이다.

## 결정 1: 새 Vault를 만들지 않고 기존 Vault를 확장한다

### 이유

- 프로젝트 경험과 개인 성향 분석은 분리하기 어렵다.
- 이력서/면접/진로 추천은 프로젝트 근거와 자기이해가 함께 있어야 정확해진다.
- Vault를 나누면 검색, Graphify, Hermes 분석 시 연결성이 떨어진다.
- 현재 Vault는 이미 Git, raw archive, Graphify, 요약 노트 구조가 잡혀 있어 확장 비용이 낮다.

### 단, 내부 계층은 분리한다

```text
1. Raw Layer
   원본 대화, Google Takeout, AI export, Hermes transcript export, 채용공고 원문 등
   → 보관용 / 직접 Graphify 금지 / Git ignore 원칙

2. Curated Knowledge Layer
   프로젝트 노트, 결정 노트, 회고, 취향 분석, 진로 전략, 요약
   → 사람이 읽는 핵심 지식 / Git 관리 / Graphify 대상

3. Index & Graph Layer
   compact index, monthly index, Graphify output, 자동 수집 radar report
   → 검색과 탐색 보조 / 원본 지식 아님
```

## 추천 확장 폴더

현재 구조에 아래 폴더를 추가하는 것을 권장한다.

```text
10-preferences/
11-career-strategy/
12-radar/
```

### 10-preferences

나에 대한 모델을 저장한다.

예시 노트:

```text
10-preferences/work-style.md
10-preferences/project-preferences.md
10-preferences/tech-preferences.md
10-preferences/frustration-patterns.md
10-preferences/energy-map.md
10-preferences/learning-style.md
10-preferences/career-fit-signals.md
```

기록할 질문:

- 어떤 프로젝트에서 오래 버티는가?
- 어떤 문제에 몰입하는가?
- 어떤 작업을 싫어하지만 반복적으로 하게 되는가?
- 프론트/백/기획/운영/고객소통 중 어디에서 에너지가 생기는가?
- 단순 구현, 문제정의, 자동화, 시스템화 중 어디가 더 잘 맞는가?
- AI 도구를 어떤 작업에 자연스럽게 쓰는가?

### 11-career-strategy

진로와 직무 선택지를 비교한다.

예시 노트:

```text
11-career-strategy/options/frontend-developer.md
11-career-strategy/options/fullstack-developer.md
11-career-strategy/options/product-engineer.md
11-career-strategy/options/ai-native-developer.md
11-career-strategy/options/web-agency-founder.md
11-career-strategy/fit-analysis/2026-career-fit-analysis.md
11-career-strategy/fit-analysis/job-posting-patterns.md
```

비교 기준:

- 기존 프로젝트 경험과 연결되는가
- 포트폴리오 근거가 충분한가
- 부족한 역량은 무엇인가
- 단기 취업 가능성
- 장기 성장성
- 수익화 가능성
- 내 성향과 맞는 정도
- 준비 액션

### 12-radar

Hermes가 주기적으로 가져오는 외부 정보를 저장한다.

예시 노트:

```text
12-radar/job-market/2026-05-week1.md
12-radar/tech-trends/2026-05-week1.md
12-radar/business-opportunities/2026-05-week1.md
12-radar/index/source-policy.md
```

수집 후보:

- 신입/주니어 풀스택, 프론트엔드, product engineer 공고
- AI 도구 활용 우대 포지션
- 웹에이전시/MVP/소상공인 디지털화 관련 사례
- Next.js, React, Spring, AI coding agents, MCP, Graph/RAG, Obsidian/LLM workflow 관련 자료

## 결정 2: 6개월 주기 raw 데이터 갱신 방식

질문: “앞으로 6개월 주기로 raw 데이터를 갱신하려고 한다. Git 연결되어 있으니 그냥 데이터만 교체하면 diff가 잡히나?”

### 답변

원칙적으로 Git이 추적하는 파일이라면 데이터 교체 시 diff가 잡힌다. 하지만 이 Vault 운영에서는 **대형 raw archive를 Git으로 추적하지 않는 것이 기본 원칙**이다.

현재 규칙상 `00-inbox/raw-archives/`는 크고 민감할 수 있으므로 Git에 올리지 않는다. 따라서 raw archive를 단순 교체해도 Git diff에는 잡히지 않는 것이 정상이다.

이 방식이 더 안전하다.

### 이유

- ChatGPT/Claude/Gemini/Google Takeout 원본에는 민감정보가 섞일 수 있다.
- export 파일은 크고 diff가 사람이 읽기 어렵다.
- 원본 JSON/HTML/ZIP을 Git에 넣으면 저장소가 급격히 커진다.
- raw 원문 diff보다 “이번 갱신으로 무엇이 추가되었는지”를 요약한 inventory/index diff가 더 유용하다.

### 추천 갱신 방식

6개월마다 raw 원본을 통째로 Git 추적하는 대신 아래 절차를 따른다.

```text
1. 기존 raw archive는 보존하거나 날짜별 snapshot 폴더로 이동한다.
2. 새 export를 00-inbox/raw-archives/ 아래에 넣는다.
3. Hermes가 inventory/index를 다시 생성한다.
4. 새로 생긴 기간, 대화 수, 제목, 날짜 범위, high-signal 후보를 요약한다.
5. curated note로 승격할 항목만 02/03/04/06/08/10/11/12 폴더에 반영한다.
6. Git에는 raw 원본이 아니라 index/summary/decision/reflection diff를 남긴다.
```

권장 구조:

```text
00-inbox/raw-archives/
  chatgpt-export/
    2026-H1/
    2026-H2/
  claude-export/
    2026-H1/
    2026-H2/
  google-takeout/
    2026-H1/
    2026-H2/
  hermes-export/
    2026-H1/
    2026-H2/
```

또는 원본 용량이 너무 크면 최신본만 유지하고, 갱신 기록은 아래처럼 curated note로 남긴다.

```text
08-summaries/ai-log-index/2026-H1-raw-refresh-report.md
08-summaries/ai-log-index/2026-H2-raw-refresh-report.md
```

### Git diff에 남겨야 할 것

Git diff에 남길 대상은 raw 원본 자체가 아니라 다음이 좋다.

```text
08-summaries/ai-log-index/*-monthly-index.md
08-summaries/ai-log-index/*-high-signal-days.md
08-summaries/ai-log-index/*-raw-refresh-report.md
02-reflections/*-growth-reflection.md
03-decisions/*.md
04-projects/*.md
06-concepts/*.md
10-preferences/*.md
11-career-strategy/*.md
12-radar/briefings/*.md
```

이렇게 하면 Git diff는 “원본 파일 변화”가 아니라 “내 지식이 어떻게 갱신됐는지”를 보여준다.

## 결정 3: AI 채팅 내역과 Google Takeout raw 데이터 처리

### ChatGPT / Claude / Gemini / Google Takeout

이 데이터는 Vault에 raw archive로 두는 것이 유용하다. Hermes가 작업할 때 다음을 할 수 있기 때문이다.

- 과거 대화 주제 검색
- 프로젝트/진로/기술 키워드별 index 생성
- high-signal days 추출
- 프로젝트 노트 보강
- 반복 관심사와 취향 분석
- 이력서/면접 스토리 근거 찾기

단, 원본을 그대로 Graphify에 넣지 않고 다음 순서로 처리한다.

```text
raw archive
  → metadata/index
  → high-signal 후보
  → summary/reflection/decision/project/concept note
  → curated graph
```

### Google Takeout 주의점

Google Takeout은 Drive, Photos, My Activity, Gemini, NotebookLM, 위치/미디어 등 자료가 섞일 수 있다. 따라서 전체를 무작정 읽거나 Graphify하지 않는다.

우선순위:

1. Gemini/NotebookLM/문서 기반 텍스트 자료
2. 날짜와 제목이 있는 활동 로그
3. 진로/프로젝트/학습과 연결되는 텍스트 후보
4. 사진/영상/오디오/위치 등 민감하거나 무거운 자료는 기본 제외

## 결정 4: Hermes 자체 채팅내역을 raw 데이터로 넣을지

질문: “Hermes 자체에서 제공하는 채팅내역도 raw 데이터로 넣는 게 작업하기에 더 편한가? 이미 Hermes 내부적으로 관리해서 중복이면 넣을 필요 없지 않나?”

### 답변

Hermes 내부 세션 저장소가 있으므로 **매번 전체 Hermes 채팅내역을 Vault raw archive에 중복 저장할 필요는 없다.** 하지만 6개월 단위로 **선별 export 또는 compact index**를 Vault에 남기는 것은 유용하다.

즉, 권장안은 다음과 같다.

```text
Hermes 내부 세션 저장소 = operational memory / 검색 가능한 작업 로그
Obsidian Vault = 장기 curated memory / 사람이 읽는 지식 계층
Hermes full raw export = 필요할 때만 snapshot
Hermes compact index = 6개월마다 저장 권장
```

### 왜 전체 중복 저장은 비추천인가

- Hermes 내부에는 이미 세션 검색 기능이 있다.
- 전체 raw transcript를 Vault에 중복하면 저장소가 커진다.
- 같은 내용이 Hermes 내부와 Vault raw에 중복되어 source of truth가 헷갈릴 수 있다.
- 민감한 tool output, 파일 경로, API 오류, 임시 작업 내용이 그대로 남을 수 있다.
- Vault의 목적은 모든 로그 보관이 아니라 장기 지식화다.

### 그래도 Hermes export/index가 유용한 경우

- Hermes 세션 저장소가 변경/마이그레이션될 수 있으므로 장기 백업이 필요할 때
- WebUI/CLI/Telegram 등 플랫폼별 세션을 한 번에 조망하고 싶을 때
- 6개월 단위로 “내가 Hermes와 무엇을 했는지” 회고하고 싶을 때
- 이력서/포트폴리오/진로 판단에 중요한 대화만 승격하고 싶을 때
- 외부 AI 로그와 Hermes 작업 로그를 함께 비교하고 싶을 때

### 추천 보관 방식

전체 raw transcript를 매번 넣기보다 아래처럼 두 단계로 운영한다.

#### 1단계: 6개월 compact index 저장

```text
08-summaries/hermes-session-index/2026-H1-hermes-session-index.md
08-summaries/hermes-session-index/2026-H2-hermes-session-index.md
```

포함할 내용:

- 기간
- 세션 수
- 주요 작업 주제
- 프로젝트별 빈도
- 생성/수정한 Vault 노트
- 사용한 도구 유형
- high-signal 세션 목록
- 장기 메모리로 승격할 후보
- 삭제/비공개 처리해야 할 민감 후보

#### 2단계: 필요한 경우에만 raw snapshot 저장

```text
00-inbox/raw-archives/hermes-export/2026-H1/
00-inbox/raw-archives/hermes-export/2026-H2/
```

이 폴더는 Git ignore 대상이다.

### 결론

Hermes 채팅내역은 이미 내부적으로 관리되므로 Vault에 전량 중복 저장할 필요는 낮다. 대신 6개월마다 **Hermes session compact index**를 생성하고, 정말 필요한 시점에만 raw snapshot을 `00-inbox/raw-archives/hermes-export/`에 보관하는 방식이 가장 좋다.

## 장기 운영 루틴

### 매 작업 후

```text
1. 중요한 결정/프로젝트/취향/진로 내용이 있으면 curated note로 저장
2. raw 원문은 수정하지 않음
3. 변경된 Markdown 민감정보 스캔
4. Graphify/lightweight graph 갱신 가능하면 갱신
5. Git diff 확인 후 commit
```

### 매월

```text
1. 최근 작업/대화 기반 reflection note 생성
2. 프로젝트별 진척과 포트폴리오 근거 갱신
3. 10-preferences에 반복 패턴 반영
4. 11-career-strategy에 진로 선택지 업데이트
5. 12-radar에서 수집한 자료 중 유효한 것만 승격
```

### 6개월마다

```text
1. ChatGPT/Claude/Gemini/Google Takeout export 갱신
2. Hermes session compact index 생성
3. raw archive inventory 재생성
4. monthly/high-signal index 재생성
5. 프로젝트/진로/취향/사업 아이디어 관점으로 승격 후보 선별
6. curated notes 업데이트
7. Graphify 갱신
8. Git commit으로 6개월 memory refresh 기록
```

## AI 에이전트 운용 관점

Hermes는 단순 Q&A보다 다음 역할로 쓰는 것이 좋다.

### 1. 기억 관리자

- raw archive inventory 생성
- 중복/충돌 정리
- curated note 생성
- Git diff/commit 관리
- Graphify 갱신

### 2. 커리어 에디터

- 프로젝트 경험을 이력서 bullet로 변환
- 면접 STAR 스토리 생성
- 안전한 표현/공격적인 표현/확인 필요한 표현 분리
- 비공개 고객 프로젝트 표현 수위 조절

### 3. 자기이해 분석가

- 반복 관심사 분석
- 작업 에너지 패턴 분석
- 프로젝트 선호도 분석
- 진로 적합도 비교

### 4. 리서치 에이전트

- 채용공고 조사
- 기술 트렌드 조사
- 사업 아이디어/경쟁 서비스 조사
- 주간 radar note 생성

### 5. 멀티에이전트 오케스트레이터

큰 작업에서는 Hermes가 서브에이전트를 나눠서 다음처럼 운용할 수 있다.

```text
Vault 분석 에이전트
코드 근거 분석 에이전트
이력서 문장화 에이전트
채용공고 매칭 에이전트
최종 검증 에이전트
```

## Source of Truth 원칙

| 대상 | Source of Truth | Vault에 넣는 방식 |
|---|---|---|
| ChatGPT/Claude/Gemini 원본 | raw export | `00-inbox/raw-archives/`에 보관, Git ignore |
| Google Takeout 원본 | raw export | 선별 inventory 후 index/summary만 승격 |
| Hermes 대화 원본 | Hermes 내부 세션 저장소 | 전체 중복 저장 비추천, 6개월 compact index 권장 |
| 프로젝트 코드 | 원본 repo | Vault에는 evidence summary/project note만 저장 |
| 이력서/면접 주장 | curated project/summary notes | 근거와 confidence를 함께 기록 |
| 자기이해/취향 | reflection/preference notes | 반복 패턴만 승격 |
| 자동 수집 정보 | radar raw/index | 원문은 raw, 판단은 briefing으로 저장 |
| Graphify 결과 | generated index | source of truth가 아니라 탐색 보조 |

## 최종 결론

- 기존 Vault를 확장한다.
- raw 원본은 Git으로 직접 추적하지 않는다.
- 6개월마다 raw 데이터를 갱신하되, Git diff에는 원본 교체가 아니라 inventory/index/curated note 변화가 남게 한다.
- Hermes 자체 채팅내역은 내부 저장소가 있으므로 전량 중복 저장하지 않는다.
- 대신 6개월 단위 Hermes session compact index를 Vault에 남긴다.
- 장기적으로 이 Vault는 “모든 로그의 창고”가 아니라 “나에 대한 장기 의사결정·커리어·프로젝트 지식 계층”으로 운용한다.
