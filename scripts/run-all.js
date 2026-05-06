import fs from "node:fs/promises";
import { chromium } from "playwright";
import { SEARCH_CONFIG, OUTPUT_PATHS } from "../src/config.js";
import { uniqueByUrl } from "../src/scrape-utils.js";
import { scrapeSaramin } from "../scrapers/saramin.js";
import { scrapeWanted } from "../scrapers/wanted.js";
import { scrapeJobkorea } from "../scrapers/jobkorea.js";

const SCRAPERS = [
  ["saramin", scrapeSaramin],
  ["wanted", scrapeWanted],
  ["jobkorea", scrapeJobkorea],
];

async function runOne(name, scraper, browser) {
  const started = Date.now();
  try {
    const jobs = await scraper({ browser, config: SEARCH_CONFIG });
    const elapsed = ((Date.now() - started) / 1000).toFixed(1);
    console.log(`[${name}] ${jobs.length} jobs in ${elapsed}s`);
    return jobs;
  } catch (err) {
    console.error(
      `[${name}] failed:`,
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

async function main() {
  await fs.mkdir(OUTPUT_PATHS.dataDir, { recursive: true });

  const browser = await chromium.launch({ headless: SEARCH_CONFIG.headless });
  let jobs = [];
  try {
    const results = await Promise.all(
      SCRAPERS.map(([name, fn]) => runOne(name, fn, browser)),
    );
    jobs = uniqueByUrl(results.flat());
  } finally {
    await browser.close();
  }

  await fs.writeFile(
    OUTPUT_PATHS.jobsJson,
    `${JSON.stringify(jobs, null, 2)}\n`,
    "utf8",
  );

  const bySource = jobs.reduce((acc, j) => {
    acc[j.source] = (acc[j.source] || 0) + 1;
    return acc;
  }, {});
  console.log(
    `Saved ${jobs.length} jobs to ${OUTPUT_PATHS.jobsJson}`,
    bySource,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
