"use strict";
/* Regression guard for A11Y-01 / A11Y-02 (static markup checks; no browser needed):
   - the risk matrix figure must not be role=img (that orphans its focusable risk dots)
   - the subcategory density strip must not be aria-hidden (that buries 23 scores from AT) */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

test("risk matrix figure is not role=img (keeps focusable risk markers reachable)", () => {
  const fig = html.match(/<figure class="matrix"[^>]*>/);
  assert.ok(fig, "matrix figure present");
  assert.ok(!/role="img"/.test(fig[0]), "matrix figure must not be role=img:\n" + fig[0]);
});

test("subcategory density strip is exposed to assistive tech (not aria-hidden)", () => {
  const div = html.match(/<div class="density"[^>]*>/);
  assert.ok(div, "density container present");
  assert.ok(!/aria-hidden="true"/.test(div[0]), "density must not be aria-hidden:\n" + div[0]);
  assert.match(div[0], /role="list"/, "density should be a list");
});

test("density cells carry a programmatic name per subcategory score", () => {
  assert.match(app, /setAttribute\("role",\s*"listitem"\)/, "density cells get role=listitem");
  assert.match(app, /aria-label.*score \$\{sc\} of 3/, "density cells expose their score via aria-label");
});
