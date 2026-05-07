import fs from "node:fs/promises";
import { chromium } from "playwright";
import { SEARCH_CONFIG, OUTPUT_PATHS } from "../src/config.js";
import { scrapeSaramin } from "../scrapers/saramin.js";
import { scrapeWanted } from "../scrapers/wanted.js";
import { scrapeJobkorea } from "../scrapers/jobkorea.js";

const SCRAPERS = [
  ["saramin", scrapeSaramin],
  ["wanted", scrapeWanted],
  ["jobkorea", scrapeJobkorea],
];

// lifecycle 정책
const EXPIRE_DAYS = 7;   // 마지막 수신 후 7일 경과 → status=expired
const PURGE_DAYS = 30;   // 마지막 수신 후 30일 경과 → 삭제

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

async function loadExisting(path) {
  try {
    const raw = await fs.readFile(path, "utf8");
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function dedupeFresh(jobs) {
  const seen = new Set();
  const out = [];
  for (const j of jobs) {
    if (!j || !j.id) continue;
    if (seen.has(j.id)) continue;
    seen.add(j.id);
    out.push(j);
  }
  return out;
}

function diffDays(aIso, bIso) {
  const a = new Date(aIso).getTime();
  const b = new Date(bIso).getTime();
  return Math.abs(a - b) / (1000 * 60 * 60 * 24);
}

function mergeJobs(existing, fresh, nowIso) {
  const byId = new Map();
  for (const j of existing) {
    if (j && j.id) byId.set(j.id, { ...j });
  }

  const seenIds = new Set();
  for (const f of fresh) {
    seenIds.add(f.id);
    const old = byId.get(f.id);
    if (old) {
      // 기존 공고 재방문: 핵심 필드는 갱신 (사이트가 정보를 추가/수정할 수 있음), lifecycle 보존
      byId.set(f.id, {
        ...old,
        title: f.title || old.title,
        company: f.company || old.company,
        location: f.location || old.location,
        experience: f.experience || old.experience,
        stack: f.stack || old.stack,
        deadline: f.deadline || old.deadline,
        url: f.url || old.url,
        first_seen: old.first_seen || old.scraped_at || nowIso,
        last_seen: nowIso,
        is_new: false,
        status: "active",
      });
    } else {
      // 신규
      byId.set(f.id, {
        ...f,
        first_seen: nowIso,
        last_seen: nowIso,
        is_new: true,
        status: "active",
      });
    }
  }

  // 이번 회차에 못 본 기존 공고: lifecycle 마이그레이션 + 만료 처리
  const removed = [];
  for (const [id, job] of byId) {
    if (seenIds.has(id)) continue;

    // 레거시 필드 보강 (이전 스키마 → 신 스키마 마이그레이션)
    if (!job.first_seen) job.first_seen = job.scraped_at || nowIso;
    if (!job.last_seen) job.last_seen = job.scraped_at || nowIso;
    job.is_new = false;

    const ageDays = diffDays(nowIso, job.last_seen);
    if (ageDays > PURGE_DAYS) {
      byId.delete(id);
      removed.push(id);
    } else if (ageDays > EXPIRE_DAYS) {
      job.status = "expired";
    } else {
      job.status = "active"; // 일시적 누락 (사이트 페이징/검색 결과 변동)
    }
  }

  return {
    merged: [...byId.values()],
    seenCount: seenIds.size,
    removedCount: removed.length,
  };
}

function summarize(jobs) {
  const counts = { active: 0, expired: 0, new: 0, total: jobs.length };
  const bySource = {};
  for (const j of jobs) {
    if (j.is_new) counts.new += 1;
    if (j.status === "expired") counts.expired += 1;
    else counts.active += 1;
    bySource[j.source] = (bySource[j.source] || 0) + 1;
  }
  return { counts, bySource };
}

async function main() {
  const nowIso = new Date().toISOString();
  await fs.mkdir(OUTPUT_PATHS.dataDir, { recursive: true });

  const existing = await loadExisting(OUTPUT_PATHS.jobsJson);
  console.log(`Loaded ${existing.length} existing jobs from ${OUTPUT_PATHS.jobsJson}`);

  const browser = await chromium.launch({ headless: SEARCH_CONFIG.headless });
  let fresh = [];
  try {
    const results = await Promise.all(
      SCRAPERS.map(([name, fn]) => runOne(name, fn, browser)),
    );
    fresh = dedupeFresh(results.flat());
  } finally {
    await browser.close();
  }
  console.log(`Fresh scrape: ${fresh.length} (after intra-run dedup)`);

  const { merged, seenCount, removedCount } = mergeJobs(existing, fresh, nowIso);
  const { counts, bySource } = summarize(merged);

  await fs.writeFile(
    OUTPUT_PATHS.jobsJson,
    `${JSON.stringify(merged, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Saved ${merged.length} jobs (active=${counts.active}, expired=${counts.expired}, new_today=${counts.new}, purged=${removedCount}) to ${OUTPUT_PATHS.jobsJson}`,
  );
  console.log("by source:", bySource);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
