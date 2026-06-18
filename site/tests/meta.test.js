"use strict";
/* Regression guard for SCORE-01 / SCORE-02: the test suite must not be silently
   doubled by stray *.test.js outside tests/ (e.g. the ChatGPT_Review_Flat export),
   and CLAIM_MATRIX.md must not assert a stale hardcoded test count that drifts. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const SITE = path.join(__dirname, "..");

function walk(dir, hits) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git" || ent.name === ".vercel") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, hits);
    else if (ent.name.endsWith(".test.js")) hits.push(path.relative(SITE, full));
  }
  return hits;
}

test("no *.test.js exists outside tests/ (prevents double-counted/forked suites)", () => {
  const stray = walk(SITE, []).filter((p) => !p.startsWith("tests" + path.sep) && !p.startsWith("tests/"));
  assert.equal(stray.length, 0, "stray test files outside tests/:\n" + stray.join("\n"));
});

test("CLAIM_MATRIX.md npm-test row asserts no stale hardcoded test count", () => {
  const matrix = fs.readFileSync(path.join(SITE, "CLAIM_MATRIX.md"), "utf8");
  const row = matrix.split("\n").find((l) => /`npm test`/.test(l));
  assert.ok(row, "npm test row present in CLAIM_MATRIX.md");
  assert.ok(!/`npm test`\s*\(\s*\d+\s*\)/.test(row),
    "CLAIM_MATRIX.md hardcodes a bare npm test count that will drift; use '(all green)':\n" + row.trim());
});
