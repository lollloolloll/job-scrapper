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

const SOURCE = "wanted";
const BASE = "https://www.wanted.co.kr";

function buildSearchUrl(keyword) {
  const q = encodeURIComponent(keyword);
  return `${BASE}/wdlist/518?country=kr&job_sort=job.latest_order&years=0&years=1&years=2&locations=seoul.all&query=${q}`;
}

async function autoScroll(page, rounds = 6) {
  for (let i = 0; i < rounds; i++) {
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
  }
}

async function scrapeOne(page, keyword, config) {
  await safeGoto(page, buildSearchUrl(keyword), config);
  await page
    .waitForSelector("a[href*='/wd/']", { timeout: 15_000 })
    .catch(() => {});
  await autoScroll(page, 4);

  return page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("li[class*='Card']"));
    const rows = [];
    const seen = new Set();
    for (const li of cards) {
      const anchor = li.querySelector("a[href*='/wd/']");
      const bookmark = li.querySelector("button[data-position-id]");
      if (!anchor) continue;
      const href = anchor.getAttribute("href") || "";
      if (!/\/wd\/\d+/.test(href)) continue;
      if (seen.has(href)) continue;
      seen.add(href);

      // bookmark data-* 속성이 가장 안정적이지만, 없으면 innerText fallback.
      let title = bookmark?.getAttribute("data-position-name") || "";
      let company = bookmark?.getAttribute("data-company-name") || "";
      let locationLine = "";
      const positionEl = li.querySelector("[class*='body__position']");
      const companyEl = li.querySelector("[class*='__company']");
      const locationEl = li.querySelector("[class*='__location']");
      if (!title && positionEl) title = positionEl.textContent || "";
      if (!company && companyEl) company = companyEl.textContent || "";
      if (locationEl) locationLine = locationEl.textContent || "";

      // location 라인은 "서울 중구 · 신입-경력 6년" 형태. 분리.
      let loc = "";
      let exp = "";
      if (locationLine) {
        const parts = locationLine.split("·").map((s) => s.trim());
        loc = parts[0] || "";
        exp = parts[1] || "";
      }

      rows.push({ href, title, company, location: loc, experience: exp });
    }
    return rows;
  });
}

export async function scrapeWanted(options = {}) {
  if (!SOURCES.wanted.enabled) return [];
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
              id: makeId(SOURCES.wanted.idPrefix, url),
              title: clean(r.title),
              company: clean(r.company),
              location: clean(r.location),
              experience: clean(r.experience) || "신입~2년",
              url,
              scraped_at: nowIso(),
            };
            collected.push(job);
          }
        } catch (err) {
          console.error(
            `[wanted] keyword "${keyword}" failed:`,
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
  const jobs = await scrapeWanted({ config: SEARCH_CONFIG });
  console.log(JSON.stringify(jobs, null, 2));
}
