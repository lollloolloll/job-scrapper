// 일회성: docs/index.html을 로컬에서 띄워 페이지네이션 동작 확인.
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";

const file = pathToFileURL(path.resolve("docs/index.html")).href;
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ locale: "ko-KR" });
const page = await ctx.newPage();
await page.goto(file, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(500);

async function snapshot(label) {
  const info = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll(".job-card"));
    // 진짜 화면에 보이는지 (computed display !== none) 기준
    const visibleCards = all.filter(
      (c) => getComputedStyle(c).display !== "none"
    );
    const total = all.length;
    const result = document.getElementById("resultCount").textContent.trim();
    const pageInfo = document.getElementById("pageInfo").textContent.trim();
    const prevDisabled = document.getElementById("prevPage").disabled;
    const nextDisabled = document.getElementById("nextPage").disabled;
    const firstTitle = visibleCards[0]?.querySelector("h2")?.textContent.trim() || null;
    const lastTitle = visibleCards.at(-1)?.querySelector("h2")?.textContent.trim() || null;
    return {
      totalCards: total,
      visibleCount: visibleCards.length,
      result,
      pageInfo,
      prevDisabled,
      nextDisabled,
      firstTitle,
      lastTitle,
    };
  });
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(info, null, 2));
}

await snapshot("초기 (페이지 1, size 20)");

await page.click("#nextPage");
await snapshot("다음 페이지 (페이지 2)");

await page.click("#nextPage");
await snapshot("페이지 3");

await page.click("#prevPage");
await snapshot("이전 → 페이지 2");

await page.selectOption("#pageSize", "40");
await snapshot("페이지 크기 40으로 변경 (1페이지로 리셋)");

await page.fill("#searchInput", "프론트엔드");
await page.waitForTimeout(200);
await snapshot('검색어 "프론트엔드" (1페이지)');

await page.fill("#searchInput", "");
await page.selectOption("#pageSize", "9999");
await snapshot("전체 보기 (size 9999)");

await browser.close();
