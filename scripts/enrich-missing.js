// is_new 무관, description이 없거나 짧은 모든 공고를 상세 enrich.
// 일회성 backfill 용도. 평소엔 enrich-new.js 사용.

import fs from "node:fs/promises";
import { chromium } from "playwright";
import { SEARCH_CONFIG, OUTPUT_PATHS } from "../src/config.js";
import { newContext, delay } from "../src/scrape-utils.js";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const MIN_DESC = 80;
const MAX_DESC_LEN = 4000;
function truncate(s, n = MAX_DESC_LEN) { if (!s) return ""; return s.length > n ? s.slice(0, n) + "…" : s; }

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

async function enrichWanted(page, job) {
  await page.goto(job.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(1500);
  return await page.evaluate(() => {
    const out = { description: "", tags: "" };
    const data = document.querySelector("#__NEXT_DATA__");
    if (data) {
      try {
        const j = JSON.parse(data.textContent || "{}");
        const detail =
          j.props?.pageProps?.head?.jobDetail?.detail ||
          j.props?.pageProps?.jobDetail?.detail ||
          j.props?.pageProps?.job?.detail || null;
        if (detail) {
          out.description = [detail.intro, detail.main_tasks, detail.requirements, detail.preferred_points, detail.benefits]
            .filter(Boolean).join("\n\n");
        }
        const skillTags = j.props?.pageProps?.head?.jobDetail?.skill_tags || j.props?.pageProps?.jobDetail?.skill_tags || [];
        out.tags = skillTags.map(t => t?.title || t?.keyword || "").filter(Boolean).join(", ");
      } catch {}
    }
    if (!out.description) {
      const main = document.querySelector("main") || document.querySelector("[class*='JobDescription']") || document.querySelector("article");
      out.description = (main?.innerText || "").trim();
    }
    return out;
  });
}

async function enrichJobkorea(page, job) {
  await page.goto(job.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(1200);
  return await page.evaluate(() => {
    const candidates = [".devReadDetail", ".tbCol", ".careersDetail-content", "[class*='RecruitContent']", ".jksection-recruit", "main"];
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

const ENRICHERS = { saramin: enrichSaramin, wanted: enrichWanted, jobkorea: enrichJobkorea };

async function main() {
  const raw = await fs.readFile(OUTPUT_PATHS.jobsJson, "utf8");
  const jobs = JSON.parse(raw);
  const targets = jobs.filter(j => ENRICHERS[j.source] && (!j.description || j.description.length < MIN_DESC));
  console.log(`Enrich-missing targets: ${targets.length}/${jobs.length}`);
  if (!targets.length) { console.log("Nothing to enrich."); return; }

  const browser = await chromium.launch({
    headless: SEARCH_CONFIG.headless,
    args: ["--disable-blink-features=AutomationControlled", "--no-sandbox", "--disable-dev-shm-usage"],
  });
  const ctx = await newContext(browser);
  const page = await ctx.newPage();
  let ok = 0, failed = 0;
  try {
    for (const job of targets) {
      try {
        const enriched = await ENRICHERS[job.source](page, job);
        const description = truncate(enriched.description || "");
        Object.assign(job, {
          description, tags: enriched.tags || job.tags || "",
          enriched_at: new Date().toISOString(),
        });
        ok += 1;
        if (ok % 10 === 0) console.log(`  progress: ${ok}/${targets.length}`);
      } catch (err) {
        failed += 1;
        console.error(`[${job.source}] ${job.id}:`, err.message || err);
      }
      await delay(SEARCH_CONFIG.requestDelayMs);
    }
  } finally {
    await ctx.close();
    await browser.close();
  }
  await fs.writeFile(OUTPUT_PATHS.jobsJson, `${JSON.stringify(jobs, null, 2)}\n`, "utf8");
  console.log(`Enriched ok=${ok} failed=${failed} of ${targets.length}`);
}

main().catch(err => { console.error(err); process.exitCode = 1; });
