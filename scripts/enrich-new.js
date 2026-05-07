// is_new=true 공고의 상세 페이지를 방문해 description/requirements/tags를 추가한다.
// 기존 공고는 건드리지 않는다 (이미 enriched라면 description 필드가 있음).

import fs from "node:fs/promises";
import { chromium } from "playwright";
import { SEARCH_CONFIG, OUTPUT_PATHS } from "../src/config.js";
import { newContext, delay } from "../src/scrape-utils.js";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const MAX_DESC_LEN = 4000;

function truncate(s, n = MAX_DESC_LEN) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n) + "…" : s;
}

// 사람인 상세 페이지는 본문이 JS로 동적 로딩되어 fetch로 못 얻는다.
// 검색 리스트에서 이미 받은 title/company/stack/experience를 합쳐 description으로 fallback.
async function enrichSaramin(page, job) {
  const parts = [
    job.title && `[제목] ${job.title}`,
    job.company && `[회사] ${job.company}`,
    job.location && `[위치] ${job.location}`,
    job.experience && `[경력] ${job.experience}`,
    job.stack && `[직무/스택] ${job.stack}`,
    job.deadline && `[마감] ${job.deadline}`,
    `[원본] ${job.url}`,
    "",
    "(상세 본문은 사람인 측 동적 로딩으로 자동 수집 불가. 위 메타데이터로 분석)",
  ].filter(Boolean);
  return { description: parts.join("\n") };
}

// 원티드는 __NEXT_DATA__ JSON에 모든 정보가 들어 있음.
async function enrichWanted(page, job) {
  await page.goto(job.url, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(1500);

  return await page.evaluate(() => {
    const out = { description: "", tags: "" };
    const data = document.querySelector("#__NEXT_DATA__");
    if (data) {
      try {
        const j = JSON.parse(data.textContent || "{}");
        // 다양한 경로 시도
        const detail =
          j.props?.pageProps?.head?.jobDetail?.detail ||
          j.props?.pageProps?.jobDetail?.detail ||
          j.props?.pageProps?.job?.detail ||
          null;
        if (detail) {
          const parts = [
            detail.intro,
            detail.main_tasks,
            detail.requirements,
            detail.preferred_points,
            detail.benefits,
          ].filter(Boolean);
          out.description = parts.join("\n\n");
        }
        const skillTags =
          j.props?.pageProps?.head?.jobDetail?.skill_tags ||
          j.props?.pageProps?.jobDetail?.skill_tags ||
          [];
        out.tags = skillTags
          .map((t) => t?.title || t?.keyword || "")
          .filter(Boolean)
          .join(", ");
      } catch {}
    }
    if (!out.description) {
      // fallback: visible main 영역 innerText
      const main =
        document.querySelector("main") ||
        document.querySelector("[class*='JobDescription']") ||
        document.querySelector("article");
      out.description = (main?.innerText || "").trim();
    }
    return out;
  });
}

// 잡코리아는 SSR. 본문 영역 텍스트 추출.
async function enrichJobkorea(page, job) {
  await page.goto(job.url, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(1200);

  return await page.evaluate(() => {
    const candidates = [
      ".devReadDetail",
      ".tbCol",
      ".careersDetail-content",
      "[class*='RecruitContent']",
      ".jksection-recruit",
      "main",
    ];
    const texts = [];
    for (const sel of candidates) {
      document.querySelectorAll(sel).forEach((n) => {
        const t = (n.innerText || "").trim();
        if (t && !texts.includes(t)) texts.push(t);
      });
    }
    return { description: texts.join("\n\n") };
  });
}

const ENRICHERS = {
  saramin: enrichSaramin,
  wanted: enrichWanted,
  jobkorea: enrichJobkorea,
};

async function main() {
  const raw = await fs.readFile(OUTPUT_PATHS.jobsJson, "utf8");
  const jobs = JSON.parse(raw);

  // 신규이고 아직 description 없거나 너무 짧은 공고
  const MIN_DESC = 80;
  const targets = jobs.filter(
    (j) =>
      j.is_new &&
      ENRICHERS[j.source] &&
      (!j.description || j.description.length < MIN_DESC),
  );
  console.log(`Enrich targets: ${targets.length}/${jobs.length}`);

  if (targets.length === 0) {
    console.log("Nothing to enrich.");
    return;
  }

  const browser = await chromium.launch({
    headless: SEARCH_CONFIG.headless,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  const context = await newContext(browser);
  const page = await context.newPage();

  let ok = 0;
  let failed = 0;
  try {
    for (const job of targets) {
      const fn = ENRICHERS[job.source];
      try {
        const enriched = await fn(page, job);
        const description = truncate(enriched.description || "");
        if (description.length < 30) {
          console.warn(`[${job.source}] ${job.id}: description too short (${description.length} chars)`);
        }
        // 머지
        Object.assign(job, {
          description,
          tags: enriched.tags || job.tags || "",
          enriched_at: new Date().toISOString(),
        });
        if (enriched.iframe_sources?.length) {
          job.iframe_sources = enriched.iframe_sources;
        }
        ok += 1;
      } catch (err) {
        failed += 1;
        console.error(
          `[${job.source}] ${job.id} enrich failed:`,
          err instanceof Error ? err.message : err,
        );
      }
      await delay(SEARCH_CONFIG.requestDelayMs);
    }
  } finally {
    await context.close();
    await browser.close();
  }

  await fs.writeFile(
    OUTPUT_PATHS.jobsJson,
    `${JSON.stringify(jobs, null, 2)}\n`,
    "utf8",
  );
  console.log(`Enriched ok=${ok} failed=${failed} of ${targets.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
