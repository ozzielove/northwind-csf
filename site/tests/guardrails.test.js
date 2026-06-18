"use strict";
/* Regression guard for DATA-01 / A11Y-03: no em-dash (U+2014) or en-dash (U+2013)
   may appear in any runtime-shipped source file. These render in user-facing copy
   and are a hard project guardrail (ASCII hyphen only). */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const SITE = path.join(__dirname, "..");
const DASH = /[\u2013\u2014]/;

// Runtime-shipped files only (not docs/tests, which are excluded from the deploy).
const RUNTIME_FILES = [
  "index.html", "app.js", "data.js", "scoring.js", "apiutil.js", "styles.css", "tour.js", "present.js",
  ...fs.readdirSync(path.join(SITE, "api")).filter((f) => f.endsWith(".js")).map((f) => "api/" + f),
];

test("no em/en dashes in any runtime-shipped source file", () => {
  const offenders = [];
  for (const rel of RUNTIME_FILES) {
    const src = fs.readFileSync(path.join(SITE, rel), "utf8");
    src.split("\n").forEach((line, i) => {
      if (DASH.test(line)) offenders.push(`${rel}:${i + 1}: ${line.trim().slice(0, 80)}`);
    });
  }
  assert.equal(offenders.length, 0, "em/en dash(es) found:\n" + offenders.join("\n"));
});
