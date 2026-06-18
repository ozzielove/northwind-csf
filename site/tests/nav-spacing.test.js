"use strict";
/* Regression guard for NAV-01: the top nav is a flex row holding mark + links +
   apistat pill + theme switch + CTA. The .themeswitch carries `margin-left:auto`,
   which absorbs ALL of justify-content:space-between's slack and pushes the right
   cluster over -- leaving the brand, links, and apistat LEFT-PACKED with zero gap
   between them at every width (the "NORTHWIND / CSF 2.0" wordmark touched the first
   "Start Here" link even at 1440px). Separately, below ~1234px the single row could
   no longer fit and the CTA spilled past the right edge; the old wrap breakpoint of
   925px left a broken 926-1233px dead-zone that crammed + overflowed on 1024 laptops.

   Fix has two halves that BOTH must hold:
     1. .nav declares a base `gap` so brand <-> links <-> apistat keep a minimum
        separation regardless of the auto-margin.
     2. the nav wraps (links drop to their own full-width row) at a breakpoint wide
        enough that the gapped single row never overflows -- raised 925px -> 1240px.

   String-match against the SHIPPED styles.css (matches poam-label-anchor.test.js /
   headers.test.js style; no browser / jsdom). */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

test("styles.css: .nav declares a base gap so brand/links/apistat are not flush-packed", () => {
  // grab the base .nav{...} block (the first one, before any @media override)
  const block = css.match(/\.nav\s*\{([\s\S]*?)\}/);
  assert.ok(block, "expected a base .nav{} rule");
  const body = block[1];
  assert.match(body, /gap:\s*(?!normal)[\d.]+rem/,
    ".nav must set an explicit non-zero gap (margin-left:auto on .themeswitch otherwise " +
    "eats all space-between slack and left-packs the brand against the links)");
});

test("styles.css: nav wrap breakpoint raised to 1240px (no 926-1233px overflow dead-zone)", () => {
  // the wrap block must engage at a breakpoint >= 1240px and set the nav to wrap with
  // the links taking their own full-width row.
  const m = css.match(/@media\s*\(\s*max-width:\s*(\d+)px\s*\)\s*\{([\s\S]*?)\n\}/g) || [];
  const wrapBlock = m.find(b => /\.nav\s*\{[^}]*flex-wrap:\s*wrap/.test(b) &&
                                /\.nav__links\s*\{[^}]*width:\s*100%/.test(b));
  assert.ok(wrapBlock, "expected an @media block that wraps .nav and gives .nav__links full width");
  const px = parseInt(wrapBlock.match(/max-width:\s*(\d+)px/)[1], 10);
  assert.ok(px >= 1240,
    `nav wrap breakpoint must be >= 1240px to clear the gapped single-row width; found ${px}px`);
});
