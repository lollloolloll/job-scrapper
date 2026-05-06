const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('docs/index.html', 'utf8');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredSnippets = [
  ['dashboard title', 'Frontend Job Radar'],
  ['search input', 'id="searchInput"'],
  ['source filter', 'id="sourceFilter"'],
  ['recommendation filter', 'id="recommendationFilter"'],
  ['sort select', 'id="sortSelect"'],
  ['job count text', 'id="resultCount"'],
  ['top skills insight', 'Top Skills'],
  ['empty state', 'id="emptyState"'],
  ['fit score data attribute', 'data-fit-score='],
  ['safe external links', 'rel="noopener noreferrer"'],
  ['generated metadata', 'Generated from data/jobs.json'],
];

for (const [label, snippet] of requiredSnippets) {
  assert.ok(html.includes(snippet), `Missing ${label}: ${snippet}`);
}

assert.ok(/class="[^"]*job-card/.test(html), 'Expected at least one job card');
assert.ok(/data-search="[^"]+"/.test(html), 'Expected searchable job-card metadata');
assert.ok(/data-recommendation="(강력 추천|추천|보류|비추천)"/.test(html), 'Expected recommendation metadata');
assert.ok(packageJson.scripts['generate:html'], 'Expected package.json generate:html script');
assert.ok(packageJson.scripts['validate:dashboard'], 'Expected package.json validate:dashboard script');

console.log('Dashboard validation passed');
