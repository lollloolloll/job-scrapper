---
type: summary
date: 2026-05-02
status: draft
confidence: medium-high
tags: [소상상점, storybook, ui, component, tailwind, responsive, frontend, resume]
source_paths:
  - /workspace/_memory/Obsidian Vault/08-summaries/sosangsangjeom-ai-learning-summary.md
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/chatgpt-export/conversations-*.json
  - /workspace/_memory/Obsidian Vault/00-inbox/raw-archives/claude-export/conversations.json
  - /host/users/skdhu/.cursor-tutor/sosangsangjeom-client
---

# 소상상점 Deep Index 03 — UI 컴포넌트/Storybook/디자인 시스템

## 핵심 결론

소상상점에서 사용자는 UI를 단순히 화면에 배치하는 수준을 넘어, 컴포넌트 분리, props 타입, Storybook 문서화, import alias, Tailwind 반응형, Figma와의 간격/폰트 동기화까지 반복적으로 질문했다.

이 경험은 **Next.js 기반 사용자 화면을 컴포넌트 단위로 구조화하고 Storybook으로 재사용성을 높인 경험**으로 포장할 수 있다.

## 자주 등장한 상황

- ProjectCard, ChipList, Dropdown, Header, Avatar, Button 등 컴포넌트 오류
- Storybook 실행/설정 오류
- story 파일 경로와 import alias 문제
- `Module not found` 오류
- Tailwind CSS 정렬, 간격, 반응형 문제
- Figma와 폰트/행간/레이아웃 맞추기
- 지도 페이지, 상점 상세, 채팅 페이지 UI
- 360px~480px 모바일 대응
- 컴포넌트 props 타입과 API 응답 타입 불일치

## 사용자가 배운 것으로 보이는 개념

### 1. 컴포넌트는 UI와 타입 계약을 함께 가진다

컴포넌트는 보이는 모양뿐 아니라 어떤 props를 받고 어떤 상태를 처리하는지까지 포함한다. TypeScript 오류는 컴포넌트 계약이 깨졌다는 신호로 볼 수 있다.

### 2. Storybook은 격리 검증 도구다

Storybook은 컴포넌트를 페이지 전체와 분리해 독립적으로 확인할 수 있게 하지만, alias/import/설정이 어긋나면 앱 실행과 별개로 Storybook build가 깨질 수 있다.

### 3. 디자인 시스템은 계속 정리해야 유지된다

Tailwind class, 폰트, 간격, variant, 반응형 기준이 각 컴포넌트에 흩어지면 화면 일관성이 깨진다. 사용자는 Figma와 실제 구현 사이의 차이를 줄이는 질문을 반복했다.

### 4. 모바일 기준은 실사용 품질과 연결된다

360px~480px 대응, 상점 상세/지도/채팅 UI는 실제 사용자가 모바일에서 보는 화면이므로 단순 데스크톱 구현보다 더 중요하다.

## 문제 → 원인 → 해결 서사 후보

### 문제

여러 화면에서 카드, 드롭다운, 헤더, 채팅 메시지, 상점 상세 UI가 반복되며, 컴포넌트 재사용과 디자인 일관성 유지가 어려웠다.

### 원인

- 컴포넌트 props 타입과 실제 데이터 구조 불일치
- Storybook alias/import 설정 누락
- Tailwind spacing/font/responsive 기준 불일치
- 페이지 단위 구현이 많아 재사용 구조가 약해질 위험

### 해결

- UI를 카드/칩/드롭다운/버튼/채팅 메시지 등 단위 컴포넌트로 분리
- Storybook story를 작성해 독립 상태에서 컴포넌트 확인
- Tailwind class와 variant 기준을 정리해 모바일 반응형을 개선
- Figma 기준과 실제 구현 차이를 확인하며 폰트/간격 조정

### 결과/학습

컴포넌트는 재사용성과 협업의 단위이며, Storybook은 디자인/개발 간 확인 비용을 줄이는 도구라는 점을 경험했다.

## 이력서 bullet 후보

- Storybook 기반으로 상점 카드, 채팅 메시지, 배너, 버튼, 드롭다운 등 재사용 UI 컴포넌트를 문서화했습니다.
- Tailwind CSS를 활용해 지도/상점 상세/채팅 화면의 모바일 중심 반응형 레이아웃을 개선했습니다.
- Figma 디자인 기준과 실제 구현을 비교하며 폰트, 간격, variant props를 정리했습니다.

## 면접 답변 포인트

> 소상상점에서는 카드나 버튼 같은 작은 컴포넌트부터 지도, 상점 상세, 채팅 화면까지 UI를 구현했습니다. 특히 Storybook을 사용하면서 컴포넌트를 페이지에서 분리해 검증하는 방법을 배웠고, import alias나 story 설정 문제도 직접 겪었습니다. Tailwind로 모바일 반응형을 맞추는 과정에서 Figma와 실제 화면의 간격/폰트 차이를 계속 확인했습니다.

## 관련 링크

- [[sosangsangjeom-ai-learning-summary]]
- [[02-api-auth]]
- [[04-build-deploy-seo]]
- [[06-interview-stories]]
