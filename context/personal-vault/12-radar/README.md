---
type: system
status: active
confidence: high
date: 2026-05-06
tags: [radar, research, 자동수집, 채용공고, 기술트렌드]
---

# 12-radar

Hermes가 주기적으로 수집하거나 사용자가 가져온 외부 정보를 정리하는 폴더입니다.

원칙:

- 원문 전체를 무작정 저장하지 않는다.
- 채용공고/기술자료/사업자료는 “왜 나에게 유용한가”를 함께 요약한다.
- raw 원문은 필요하면 `raw/`에 두되 Git 추적 대상에서 제외한다.
- 사람이 읽을 결과물은 `briefings/` 또는 주제별 폴더에 저장한다.

추천 구조:

```text
job-market/
tech-trends/
business-opportunities/
briefings/
index/
raw/
```

활용 예시:

- 주간 채용공고 매칭 리포트
- Next.js/Spring/AI agent 기술 트렌드 요약
- 웹에이전시/MVP 사업 아이디어 조사
- 소상공인/기관 디지털화 관련 사례 수집
