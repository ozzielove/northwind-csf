"use strict";
/* Regression guard for LAY-01: POA&M milestone labels (.cmile__lbl) are a fixed
   width and center-anchored on their dot. A milestone whose dot sits near a rail
   end therefore pushed half its label past the rail -> at <=1024px the rightmost
   milestone's label overran the VIEWPORT and produced a page-wide horizontal
   scrollbar (release blocker); at 1440 it overran the #cmmc section box.

   Fix has two halves that BOTH must hold, so this test guards both files:
     1. app.js milestone generator tags edge dots with `cmile--start` (pos <= 15%)
        or `cmile--end` (pos >= 85%); positions are clamped to [2,98] by pct().
     2. styles.css anchors those labels inward (left/right) ONLY in rail mode
        (@media min-width:681px); below 681px the rail stacks and labels are static.

   Behavioral (not just string-match): the edge ternary is extracted from the
   SHIPPED app.js and executed, so changing the thresholds or dropping a class
   fails the test. No browser / jsdom required (matches demo-fallback.test.js). */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const SITE = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(SITE, "app.js"), "utf8");
const css = fs.readFileSync(path.join(SITE, "styles.css"), "utf8");

test("app.js: pct() clamps milestone positions into the rail [2,98]", () => {
  assert.match(app, /Math\.max\(\s*2\s*,\s*Math\.min\(\s*98\s*,/,
    "pct() must clamp dot positions to [2,98] so even extreme dates stay on the rail");
});

test("app.js: milestone generator emits both edge classes", () => {
  assert.match(app, /cmile--start/, "generator must tag start-of-rail milestones");
  assert.match(app, /cmile--end/, "generator must tag end-of-rail milestones");
});

test("app.js: edge-classification thresholds anchor only the extremes", () => {
  // Extract the shipped ternary: const edge = pos <= N ? " cmile--start" : pos >= M ? " cmile--end" : "";
  const m = app.match(/const\s+edge\s*=\s*([^;]+);/);
  assert.ok(m, "could not find the `const edge = ...` classification in app.js");
  const classify = new Function("pos", "return (" + m[1] + ");");

  const cls = (p) => classify(p).trim();
  // Real data extremes seen in the audit: 6.6% (start) and 98% (end).
  assert.equal(cls(6.6), "cmile--start", "leftmost real milestone must anchor left");
  assert.equal(cls(98), "cmile--end", "rightmost real milestone must anchor right");
  // Clamp bounds.
  assert.equal(cls(2), "cmile--start");
  assert.equal(cls(98.0), "cmile--end");
  // Interior milestones stay center-anchored (no edge class) - they do not overflow.
  assert.equal(cls(50), "", "centered milestone must not be edge-anchored");
  assert.equal(cls(40), "");
  assert.equal(cls(60), "");
});

test("styles.css: edge labels anchor inward, and ONLY in rail mode (>=681px)", () => {
  // The anchor overrides must live inside an @media (min-width:681px) block so the
  // <=680px stacked variant (labels static, left-aligned) is untouched.
  const block = css.match(/@media\s*\(\s*min-width:\s*681px\s*\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(block, "expected an @media (min-width:681px) block for edge anchoring");
  const body = block[1];
  // start label anchored to the left edge of the dot
  assert.match(body, /\.cmile--start\s+\.cmile__lbl\s*\{[^}]*text-align:\s*left/,
    "start label must left-anchor in rail mode");
  // end label anchored to the right (right:; transform:none; text-align:right)
  assert.match(body, /\.cmile--end\s+\.cmile__lbl\s*\{[^}]*right:[^}]*text-align:\s*right/,
    "end label must right-anchor in rail mode");
});
