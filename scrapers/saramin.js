import { pathToFileURL } from "node:url";
import { SEARCH_CONFIG, SOURCES } from "../src/config.js";
import {
  withBrowser,
  newContext,
  delay,
  clean,
  makeId,
  nowIso,
  emptyJob,
} from "../src/scrape-utils.js";

const SOURCE = "saramin";
const BASE = "https://www.saramin.co.kr";

// 사람인은 Playwright의 헤드리스 트래픽을 차단(ERR_TIMED_OUT/RESET)한다.
// 일반 HTTP fetch(브라우저 UA)는 200 OK로 동작하므로, fetch로 HTML을 받아
// Playwright page.setContent에 주입한 뒤 동일한 DOM 추출 로직을 쓴다.

function buildSearchUrl(keyword, config) {
  const params = new URLSearchParams({
    searchType: "search",
    searchword: keyword,
    recruitPage: "1",
    recruitSort: "relation",
    recruitPageCount: String(Math.min(40, config.maxPerSite)),
    exp_cd: "1,2",
  });
  return `${BASE}/zf_user/search/recruit?${params.toString()}`;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

async function scrapeOne(page, keyword, config) {
  const url = buildSearchUrl(keyword, config);
  const html = await fetchHtml(url);
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  return page.evaluate(() => {
    const items = Array.from(document.querySelectorAll(".item_recruit"));
    return items
      .map((el) => {
        const titleEl = el.querySelector(".job_tit a");
        const companyEl = el.querySelector(".corp_name a");
        const conditions = Array.from(
          el.querySelectorAll(".job_condition span"),
        ).map((n) => (n.textContent || "").trim());
        const stackEl = el.querySelector(".job_sector");
        const dateEl = el.querySelector(".job_date .date");
        const deadlineEl = el.querySelector(".job_date .deadlines");
        const href = titleEl?.getAttribute("href") || "";
        return {
          title: titleEl?.getAttribute("title") || titleEl?.textContent || "",
          company: companyEl?.textContent || "",
          conditions,
          stack: stackEl?.textContent || "",
          deadline:
            dateEl?.textContent || deadlineEl?.textContent || "",
          href,
        };
      })
      .filter((r) => r.href && r.title);
  });
}

export async function scrapeSaramin(options = {}) {
  if (!SOURCES.saramin.enabled) return [];
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
            const [location = "", experience = "", education = ""] =
              r.conditions;
            const job = {
              ...emptyJob(SOURCE),
              id: makeId(SOURCES.saramin.idPrefix, url),
              title: clean(r.title),
              company: clean(r.company),
              location: clean(location),
              experience: clean(experience || education),
              stack: clean(r.stack),
              url,
              deadline: clean(r.deadline),
              scraped_at: nowIso(),
            };
            collected.push(job);
          }
        } catch (err) {
          console.error(
            `[saramin] keyword "${keyword}" failed:`,
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
  const jobs = await scrapeSaramin({ config: SEARCH_CONFIG });
  console.log(JSON.stringify(jobs, null, 2));
}
