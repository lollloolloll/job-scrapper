# Jules 분석 루틴 프롬프트 (증분 모드)

> Jules dashboard의 task prompt에 이 파일 내용을 그대로 붙여넣으세요.
> 매일 cron으로 GitHub Actions가 `data/jobs.json`을 갱신한 뒤 이 루틴이 깨어납니다.

---

레포지토리의 `data/jobs.json`을 읽고, `context/personal-vault/` 사용자 지식 베이스를 참고해 **신규 공고만** 사용자 맞춤형으로 분석한 뒤 `data/analysis.json`을 갱신하고 `npm run generate:html`로 `docs/index.html`을 생성/커밋한다.

반드시 작업이 완료되면 main 브랜치에 결과가 반영되어 있어야 한다. PR은 만들 필요 없다.
- 현재 브랜치가 main이면 직접 커밋 후 push.
- 별도 작업 브랜치에서 시작했다면 main으로 merge까지 완료한 뒤 push.
- 단, 병합 충돌/검증 실패/민감정보 감지 시 임의로 강행하지 말고 실패 사유를 남긴다.

## 0. 동작 원칙 — 증분 분석

이 루틴은 매일 도는 cron 작업이며 90개 공고를 매번 다시 분석하지 않는다.

1. `data/jobs.json`을 로드한다. 각 공고에는 `id`, `is_new`, `status`, `first_seen`, `last_seen` 필드가 있다.
2. `data/analysis.json`을 로드한다. 키는 `job.id`, 값은 분석 객체.
3. **분석 대상**:
   - `status !== "expired"`인 active 공고 중,
   - `analysis.json`에 `id`가 없는 공고 (= 신규 + 미분석)
   - 또는 사용자가 명시적으로 재분석을 요청한 공고
4. 기존 `analysis.json` entry는 **삭제하지 말고 보존**한다.
5. 분석 끝나면 `npm run generate:html`로 HTML을 빌드하고 `npm run validate:dashboard`로 검증한다.
6. 검증 통과 시에만 commit/push.

## 1. 사용자 지식 베이스 우선 읽기

공고를 분석하기 전에 `context/personal-vault/`의 다음 경로를 먼저 읽어 사용자의 강점/취향/회피 조건/지원 전략을 파악하라:

```
context/personal-vault/README.md
context/personal-vault/SCHEMA.md
context/personal-vault/Home.md
context/personal-vault/04-projects/
context/personal-vault/08-summaries/
context/personal-vault/02-reflections/
context/personal-vault/03-decisions/
context/personal-vault/10-preferences/
context/personal-vault/11-career-strategy/
context/personal-vault/12-radar/
```

읽지 말 경로:
```
00-inbox/raw-archives/    attachments/    graphify-out/
09-graphify/graphify-out/ node_modules/   .git/
.env                       secrets.*       *.key   *.pem
```

규칙:
- raw archive 원문, 비공개 고객사 상세, 민감정보는 HTML/analysis.json에 노출하지 말 것.
- Vault 내용을 그대로 복붙하지 말고 공고 판단의 기준으로만 사용.
- `privacy: client-confidential` frontmatter가 붙은 파일은 식별자/URL을 일반화 ("비공개 고객사 웹 프로젝트") 처리.
- 근거 약하면 "확인 필요"로 명시.

## 2. analysis.json 스키마

각 공고에 대해 `data/analysis.json`에 다음 키로 저장:

```json
{
  "saramin_53570567": {
    "fit_score": 9,
    "recommendation": "강력 추천",
    "core_stack_tags": ["Next.js", "React", "TypeScript"],
    "summary": "공고에 따라 다른 한 줄. 회사명+직무+사용자 fit 강조점.",
    "reason": "공고 특성과 사용자 프로젝트를 구체적으로 연결한 추천 이유. 매번 다른 문장.",
    "risk": "이 공고에 한정된 위험 요소 (없으면 '큰 위험 신호 없음')",
    "feature_project": "이 공고에 앞세울 프로젝트 (소상상점 / 쌍청문 공간대여 / 쌍청문 키오스크 / 웹에이전시 MVP / AI workflow 중)",
    "learning_points": "공고가 요구하는데 사용자에게 약한 부분",
    "motivation": "이 공고에만 통하는 지원동기 한 줄",
    "questions_to_ask": "지원 전 인사담당자/JD 추가 확인 사항",
    "portfolio_link_point": "포트폴리오에서 어느 프로젝트/스토리로 연결할지",
    "analyzed_at": "2026-05-08T00:00:00Z"
  }
}
```

### 필드 제약 (validate-dashboard.cjs로 강제)

- `fit_score`: 1~10 정수만 허용
- `recommendation`: 반드시 다음 4개 중 하나 — `강력 추천` / `추천` / `보류` / `비추천`
  - `애매`, `보통`, `TBD`, `검토` 같은 값은 fail 처리됨
- score-recommendation 정합성:
  - 9~10점 → `강력 추천`
  - 7~8점 → `강력 추천` 또는 `추천`
  - 4~6점 → `추천` 또는 `보류`
  - 1~3점 → `보류` 또는 `비추천`

### 매크로 문장 금지

다음 문장은 절대 반복 금지:
- "주력 스택과 잘 맞으며, 주니어 지원이 적합해 보입니다"
- "React 기반 서비스 개발 경험을 바탕으로 기여하고 싶습니다"
- "채용 공고의 세부 도메인 지식 파악"
- 동일 문구를 3개 이상 카드에 사용 → `validate-dashboard.cjs`가 fail 처리

대신 공고별로:
- 관리자/운영툴 → 쌍청문 공간대여/키오스크 운영 경험
- Next.js/SEO/서비스 웹 → 소상상점 경험
- MVP/스타트업/랜딩/고객 요구사항 → 웹에이전시/MVP 경험
- AI/자동화/생산성 → AI-native workflow를 보조 강점으로
- 백엔드/풀스택 → 프론트 비중 확인 질문 명시

## 3. 점수 가이드

- 9~10: 오늘 바로 지원 후보로 올릴 공고 (전체의 40% 초과 시 validate fail)
- 7~8: 가능성 높음, 조건 확인
- 5~6: 애매. 원본 확인 후 판단
- 3~4: 보류
- 1~2: 비추천

점수는 **합격 가능성이 아니라 검토 우선순위**다.

높게: Next.js/React/TS 중심, 신입 가능, 운영 문제 해결 경험 어필 가능, 예약/대여/관리자/커머스/MVP/스타트업 도메인.

낮게: 경력 3년+, 시니어/리드, 프론트 비중 약함, 퍼블리싱만, RN 단독, SI 파견, 비개발 직무.

## 4. 작업 순서

1. `npm install` (deps 갱신 시)
2. `data/jobs.json`, `data/analysis.json` 로드
3. 분석 대상 공고 추출 (위 §0의 기준)
4. context vault 읽고 사용자 프로필 정리 (내부적으로만)
5. 각 대상 공고별로 분석 작성 → `analysis.json`에 추가/갱신 (기존 entry 삭제 X)
6. `data/analysis.json` 저장
7. `npm run generate:html` 실행 → `docs/index.html` 갱신
8. `npm run validate:dashboard` 실행
   - fail이면 분석을 다시 보거나 누락 필드 채워서 재시도
   - 3회 재시도 후에도 fail이면 작업 중단, 실패 사유 남기고 종료
9. `git add data/analysis.json docs/index.html`
10. `git commit -m "chore: AI 분석 결과 업데이트 YYYY-MM-DD"`
11. `git push origin main` (또는 main으로 merge 후 push)

## 5. 실패 처리

- 병합 충돌: 강제 push 금지. ANALYSIS_LOG.md에 timestamp + 충돌 파일 + 사유 기록 후 종료.
- validate fail: 위 §4 8단계 참조.
- 민감 패턴 감지: 분석/HTML에서 해당 entry 제거 후 재시도.
- 사이트 차단: 해당 공고는 skip하고 나머지 진행.

## 6. 기억해야 할 것

- **이미 분석된 공고는 건드리지 마라.** 매일 5~15개 신규만 추가한다.
- generate_html.cjs는 `analysis.json`을 우선 사용하고, 없는 공고는 keyword-rule fallback으로 처리하므로 모든 공고가 카드로 렌더된다.
- HTML 빌드는 `npm run generate:html` 하나로 끝난다 — 직접 HTML을 작성하지 마라.
- validate-dashboard.cjs가 통과 못하면 push하지 마라.

커밋 메시지: `chore: AI 분석 결과 업데이트 YYYY-MM-DD`
