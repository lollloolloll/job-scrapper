---
type: decision
date: 2026-05-03
status: active
confidence: medium
tags: [decision, deployment, quality, portfolio]
---

# 배포 전 품질 기준을 별도 역량으로 본다

## 결정

배포는 “작동한다”에서 끝내지 않고, 이미지 오류·빌드 오류·SEO·반응형·컴포넌트 표시 품질까지 포함한 **출시 품질 기준**으로 관리한다.

## 맥락

2025-03~05 기록에는 `SEO 필수 요소들`, `Docker 실습 시작하기`, `배포 퀄리티 기준 논의`, `Fixing Next.js Image Component Issues in Participant Avatars`가 등장한다. 이는 배포가 단순 명령 실행이 아니라 사용자에게 보이는 품질 확인 단계였음을 보여준다.

## 선택 이유

- 포트폴리오에서는 “로컬에서 동작”보다 “배포 가능한 품질”이 훨씬 설득력 있다.
- 이미지, 썸네일, CSS, Storybook, SEO는 프론트엔드 완성도를 보여주는 증거다.
- 문제 발생 시 원인을 분해하고 수정한 흐름을 면접 이야기로 만들 수 있다.

## 재검토 조건

실제 배포 URL, 사용자 수, Lighthouse 점수, 검색 노출 등 정량 지표가 확인되면 이 노트를 업데이트한다.

## 연결 노트

- [[04-build-deploy-seo]]
- [[build-deploy-seo-quality]]

## 근거 source
- `08-summaries/ai-log-index/2025-03-high-signal-days.md`
- `08-summaries/ai-log-index/2025-04-high-signal-days.md`
- `08-summaries/ai-log-index/2025-05-high-signal-days.md`
- `08-summaries/ai-log-index/ai-log-records-compact.json`
