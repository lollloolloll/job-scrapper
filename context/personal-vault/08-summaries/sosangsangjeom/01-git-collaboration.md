---
type: summary
date: 2026-05-02
status: draft
confidence: medium-high
tags: [소상상점, git, github, collaboration, resume, ai-log]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/sosangsangjeom-ai-learning-summary.md
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
---

# 소상상점 Deep Index 01 — Git/GitHub 협업

## 핵심 결론

소상상점에서 사용자가 AI에게 반복적으로 물어본 가장 큰 축 중 하나는 Git/GitHub 협업이었다. 단순히 `push` 명령어 하나를 묻는 수준이 아니라, 시간이 지나면서 브랜치 전략, 원격 저장소 권한, develop/feature/hotfix 흐름, PR 메시지, 리뷰 요청, conflict 대응까지 확장됐다.

이 경험은 이력서에서 “Git을 사용해봤다”가 아니라 **팀 프로젝트에서 기능 브랜치와 PR 중심 협업을 실제로 겪었다**로 표현하는 것이 좋다.

## 자주 등장한 상황

- `git push origin feature/...` 권한 오류
- repository write access 문제
- `git pull develop`처럼 remote와 branch 개념이 섞인 명령 오류
- `origin/develop`, `develop`, `feature/...`의 차이 이해
- branch checkout, merge, cherry-pick, reset, rebase
- hotfix 브랜치 생성 후 build error 해결
- PR 작성 완료 메시지, 리뷰 요청 문구, 작업 지연 공유 문구
- merge conflict나 develop 반영 순서 고민

## 사용자가 배운 것으로 보이는 개념

### 1. remote와 branch는 다르다

초기 질문에는 `develop`을 remote처럼 쓰거나, `origin/develop`과 로컬 `develop`의 차이를 헷갈린 흔적이 있다. 이후에는 작업 브랜치를 만들고, 원격 브랜치에 push하고, PR로 develop에 반영하는 흐름을 점점 이해한 것으로 보인다.

### 2. Git 명령어는 협업 흐름과 연결된다

`merge`, `reset`, `rebase`, `cherry-pick`은 단순한 복구 명령이 아니라 “팀원 코드와 내 작업을 어떤 순서로 합칠지”를 결정하는 도구다. 소상상점에서는 기능 구현 중 빌드 오류, 브랜치 꼬임, PR 반영 순서가 함께 등장했기 때문에 Git을 실무형으로 학습한 흔적이 있다.

### 3. PR은 코드 제출이 아니라 설명이다

AI 로그에는 PR 문구를 다듬거나 리뷰 요청 메시지를 정리한 흔적이 있다. 이는 사용자가 코드만 올리는 것이 아니라, 팀원에게 변경 범위·현재 상태·리뷰 포인트를 전달하는 협업 방식을 배웠다는 근거가 된다.

## 문제 → 원인 → 해결 서사 후보

### 문제

기능 개발 중 브랜치/원격 저장소/권한/빌드 오류가 얽히면서, 단순히 코드를 작성해도 팀 저장소에 안전하게 반영하기 어려운 상황이 반복됐다.

### 원인

- remote와 branch 개념 혼동
- develop 브랜치 최신화 없이 feature 작업 진행
- build error가 PR/merge 단계에서 발견됨
- PR 메시지에 작업 범위와 리뷰 포인트가 충분히 정리되지 않음

### 해결

- `origin/develop`과 로컬 `develop`, feature/hotfix 브랜치의 역할을 구분
- 작업 전 develop 최신화, 기능 브랜치 생성, push, PR 흐름을 정리
- build error 발생 시 hotfix 브랜치/PR로 분리해 해결
- PR 설명과 리뷰 요청 메시지를 구조화

### 결과/학습

Git을 “명령어 모음”이 아니라 팀 개발의 안전장치로 이해하게 됐다. 이력서에는 커밋 수보다 협업 과정에서 겪은 문제와 해결 흐름을 강조해야 한다.

## 이력서 bullet 후보

- GitHub Flow 기반 팀 프로젝트에서 feature/hotfix 브랜치, PR, merge conflict, build error 대응을 경험했습니다.
- PR 설명과 리뷰 요청 메시지를 정리해 변경 범위와 리뷰 포인트를 팀원에게 명확히 공유했습니다.
- develop 브랜치 최신화, 기능 브랜치 분리, hotfix PR 반영 흐름을 익히며 협업 안정성을 높였습니다.

## 면접 답변 포인트

> 처음에는 Git 명령어 자체가 헷갈렸지만, 소상상점 프로젝트를 진행하면서 원격 저장소와 브랜치의 차이, feature/develop/hotfix 흐름, PR 리뷰 과정을 실제로 겪었습니다. 특히 빌드 오류나 브랜치 충돌이 생겼을 때 단순히 로컬에서 해결하는 데 그치지 않고, 어떤 브랜치에서 수정하고 어떻게 PR로 공유할지까지 고민하면서 Git을 협업 도구로 이해하게 됐습니다.

## 주의사항

- `2080개 커밋`은 팀/브랜치/merge 이력이 섞였을 가능성이 있으므로 개인 성과 수치로 쓰지 않는다.
- “AI가 Git 명령어를 알려줬다”보다 “오류 원인을 해석하고 협업 흐름을 학습하는 데 AI를 활용했다”로 표현한다.

## 관련 링크

- [[sosangsangjeom-ai-learning-summary]]
- [[small-business-web-projects]]
- [[02-api-auth]]
- [[06-interview-stories]]
