import { pathToFileURL } from "node:url";
import { SEARCH_CONFIG, SOURCES } from "../src/config.js";
import {
  withBrowser,
  newContext,
  safeGoto,
  delay,
  clean,
  makeId,
  nowIso,
  emptyJob,
} from "../src/scrape-utils.js";

const SOURCE = "jobkorea";
const BASE = "https://www.jobkorea.co.kr";

function buildSearchUrl(keyword) {
  const q = encodeURIComponent(keyword);
  return `${BASE}/Search/?stext=${q}&tabType=recruit&Page_No=1&careerType=1&local=I000`;
}

async function scrapeOne(page, keyword, config) {
  await safeGoto(page, buildSearchUrl(keyword), config);
  await page
    .waitForSelector("a[href*='/Recruit/GI_Read/']", { timeout: 15_000 })
    .catch(() => {});
  // SPA — 추가 hydration 시간 확보
  await page.waitForTimeout(2500);

  return page.evaluate(() => {
    const titleEls = Array.from(
      document.querySelectorAll("[data-sentry-component='Title']"),
    );
    const rows = [];
    const seen = new Set();
    for (const titleA of titleEls) {
      const href = titleA.getAttribute("href") || "";
      if (!/\/Recruit\/GI_Read\/\d+/.test(href)) continue;
      if (seen.has(href)) continue;
      seen.add(href);

      // 카드 컨테이너로 올라가기.
      let card = titleA;
      for (let i = 0; i < 6 && card.parentElement; i++) {
        card = card.parentElement;
        if (
          card.className?.includes &&
          card.className.includes("flex") &&
          card.className.includes("p-7")
        )
          break;
      }
      const title = (titleA.textContent || "").trim();
      const lines = (card.innerText || "")
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean);

      // 노이즈 라인 제거.
      const noise = new Set([
        "스크랩",
        "신입 지원 가능",
        "즉시 지원",
        "•",
        "신입·경력",
      ]);
      const cleanLines = lines.filter((l) => !noise.has(l));
      // 첫 매칭 = title (또는 그 다음 라인). 그 다음 라인을 company로 추정.
      const idx = cleanLines.indexOf(title);
      const company = idx >= 0 ? cleanLines[idx + 1] || "" : cleanLines[1] || "";
      const location = idx >= 0 ? cleanLines[idx + 2] || "" : cleanLines[2] || "";
      const stack = idx >= 0 ? cleanLines[idx + 3] || "" : "";
      // deadline은 "MM/DD(요일) 등록", "마감 D-7", "상시채용" 같은 패턴.
      const deadline =
        cleanLines.find((l) =>
          /\d{1,2}\/\d{1,2}|등록|마감\s*D-|상시채용/.test(l),
        ) || "";

      rows.push({ href, title, company, location, stack, deadline });
    }
    return rows;
  });
}

export async function scrapeJobkorea(options = {}) {
  if (!SOURCES.jobkorea.enabled) return [];
  return withBrowser(async (browser, config) => {
    const context = await newContext(browser);
    const page = await context.newPage();
    const collected = [];

    try {
      for (const keyword of config.keywords) {
        if (collected.length >= config.maxPerSite) break;
        try {
          const rows = await scrapeOne(page, keyword, config);
          for (const r of rows) {
            if (collected.length >= config.maxPerSite) break;
            const url = r.href.startsWith("http") ? r.href : `${BASE}${r.href}`;
            const job = {
              ...emptyJob(SOURCE),
              id: makeId(SOURCES.jobkorea.idPrefix, url),
              title: clean(r.title),
              company: clean(r.company),
              location: clean(r.location),
              experience: "신입",
              stack: clean(r.stack),
              url,
              deadline: clean(r.deadline),
              scraped_at: nowIso(),
            };
            collected.push(job);
          }
        } catch (err) {
          console.error(
            `[jobkorea] keyword "${keyword}" failed:`,
            err instanceof Error ? err.message : err,
          );
        }
        await delay(config.requestDelayMs);
      }
    } finally {
      await context.close();
    }

    return collected;
  }, options);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const jobs = await scrapeJobkorea({ config: SEARCH_CONFIG });
  console.log(JSON.stringify(jobs, null, 2));
}
