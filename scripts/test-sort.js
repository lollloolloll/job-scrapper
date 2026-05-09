// 정렬 옵션 동작 검증.
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";

const file = pathToFileURL(path.resolve("docs/index.html")).href;
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ locale: "ko-KR" });
const page = await ctx.newPage();
await page.goto(file, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(300);

async function topCards(label, sortValue) {
  await page.selectOption("#sortSelect", sortValue);
  await page.waitForTimeout(150);
  const top = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".job-card"))
      .filter((c) => getComputedStyle(c).display !== "none");
    return cards.slice(0, 5).map((c) => ({
      score: c.dataset.fitScore,
      firstSeen: (c.dataset.firstSeen || "").slice(0, 10),
      title: (c.querySelector("h2")?.textContent || "").trim().slice(0, 36),
      company: (c.dataset.company || "").slice(0, 18),
    }));
  });
  console.log(`\n=== ${label} (${sortValue}) ===`);
  for (const t of top) console.log(`  [${t.score}] ${t.firstSeen} | ${t.company} | ${t.title}`);
}

await topCards("기본: 적합도 높은순", "score-desc");
await topCards("최신 등록순", "first-seen-desc");
await topCards("오래된 등록순", "first-seen-asc");
await topCards("최근 수집순", "scraped-desc");

await browser.close();
