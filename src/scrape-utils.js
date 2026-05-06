// 스크래퍼 공통 유틸. 사이트별 구조 변경에 방어적으로 대응한다.

import { chromium } from "playwright";
import { SEARCH_CONFIG } from "./config.js";

const DEFAULT_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export async function withBrowser(scraperFn, options = {}) {
  const { browser, config = SEARCH_CONFIG } = options;
  const owns = !browser;
  const b =
    browser ??
    (await chromium.launch({
      headless: config.headless,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
        "--disable-dev-shm-usage",
      ],
    }));
  try {
    return await scraperFn(b, config);
  } finally {
    if (owns) await b.close();
  }
}

export async function newContext(browser) {
  const ctx = await browser.newContext({
    userAgent: DEFAULT_UA,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    viewport: { width: 1366, height: 900 },
    extraHTTPHeaders: {
      "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
    },
  });
  // navigator.webdriver / chrome / plugins 위장
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    Object.defineProperty(navigator, "languages", {
      get: () => ["ko-KR", "ko", "en-US", "en"],
    });
    Object.defineProperty(navigator, "plugins", {
      get: () => [1, 2, 3, 4, 5],
    });
    // window.chrome 객체 흉내
    if (!window.chrome) {
      // @ts-expect-error
      window.chrome = { runtime: {} };
    }
  });
  return ctx;
}

export function nowIso() {
  return new Date().toISOString();
}

export function makeId(prefix, urlOrKey) {
  // URL에서 마지막 숫자 ID를 우선 추출, 없으면 해시 fallback.
  const m = String(urlOrKey).match(/(\d{5,})/);
  if (m) return `${prefix}_${m[1]}`;
  let hash = 0;
  for (const c of String(urlOrKey)) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  return `${prefix}_${hash.toString(16)}`;
}

export function clean(text) {
  if (text == null) return "";
  return String(text).replace(/\s+/g, " ").trim();
}

export function uniqueByUrl(jobs) {
  const seen = new Set();
  const out = [];
  for (const j of jobs) {
    const key = j.url || `${j.source}:${j.company}:${j.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(j);
  }
  return out;
}

export async function safeGoto(page, url, config) {
  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: config.navigationTimeoutMs,
  });
}

export async function delay(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

export function emptyJob(source) {
  return {
    id: "",
    source,
    title: "",
    company: "",
    location: "",
    experience: "",
    stack: "",
    salary: "",
    url: "",
    deadline: "",
    scraped_at: nowIso(),
  };
}
