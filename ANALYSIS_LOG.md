# Analysis Failure Log

- **Date:** 2026-07-06T08:35:00Z
- **Reason:** Validation failed because the validation script's `outOfScopeRegex` does not catch "로봇 응용 SW 개발자" (saramin_54366495), resulting in a missing analysis error for an out-of-scope job. Following PRD §0 and §4 step 8, I have aborted the process and left the working tree clean.
- [2026-07-07] Aborted: npm run validate:dashboard failed due to script bugs (incomplete regexes for out-of-scope jobs). According to explicit constraints, I am accepting the expected failure, reverting unintended changes, and submitting without committing.
