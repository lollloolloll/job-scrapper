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

// 사람인은 데스크톱 detail이 JS 동적 로딩 + Playwright 차단됨.
// 모바일 사이트(m.saramin.co.kr)는 차단 약하고 section_view에 풍부한 메타가 노출됨.
// (본문 자체는 이미지로 업로드되어 있어 텍스트 추출 불가 — 메타 + 검색 stack으로 대체)
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) " +
  "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function extractRecIdx(url) {
  const m = String(url || "").match(/rec_idx=(\d+)/);
  return m ? m[1] : null;
}

async function enrichSaramin(page, job) {
  const recIdx = extractRecIdx(job.url);
  if (!recIdx) {
    return { description: `[제목] ${job.title}\n[회사] ${job.company}\n[원본] ${job.url}` };
  }
  const mobileUrl = `https://m.saramin.co.kr/job-search/view?rec_idx=${recIdx}`;
  const res = await fetch(mobileUrl, {
    headers: {
      "User-Agent": MOBILE_UA,
      "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Referer": "https://m.saramin.co.kr/",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  // section_view 블록만 추출해 텍스트화 — 접수기간/전형/기업정보/복리후생/근무지/관련태그
  const sections = html.match(/<section[^>]*class="section_view"[^>]*>[\s\S]*?<\/section>/g) || [];
  const texts = sections
    .map((s) =>
      s
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/<style[\s\S]*?<\/style>/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((t) => t.length > 20);

  // 메타 헤더 추가 (검색 리스트 정보 합치기)
  const header = [
    job.title && `[제목] ${job.title}`,
    job.company && `[회사] ${job.company}`,
    job.location && `[위치] ${job.location}`,
    job.experience && `[경력] ${job.experience}`,
    job.stack && `[직무/스택] ${job.stack}`,
  ]
    .filter(Boolean)
    .join("\n");

  const description = [header, ...texts].join("\n\n");
  return { description };
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
