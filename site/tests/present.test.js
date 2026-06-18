"use strict";
/* Guard for the Guided Presentation mode (present.js). Static checks, no browser:
   - the presenter step list is the expected size and equals the count the card shows
   - every step target/fire selector actually resolves to markup in index.html
   - no em/en dashes (U+2013/U+2014) appear anywhere in present.js (hard project guardrail)
   - the presenter card is a role="dialog" aria-modal (a11y parity with the tour)
   - present.js is wired into index.html after tour.js */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const SITE = path.join(__dirname, "..");
const present = fs.readFileSync(path.join(SITE, "present.js"), "utf8");
const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const css = fs.readFileSync(path.join(SITE, "styles.css"), "utf8");

const EXPECTED_STEPS = 9;
const DASH = /[\u2013\u2014]/; // en-dash, em-dash (escaped so this file stays ASCII-clean)

// pull the literal selectors out of the STEPS array (target: "..." and fire: "...")
function selectorsFrom(src, key) {
  const re = new RegExp(key + '\\s*:\\s*(["\'])((?:\\\\.|(?!\\1).)*)\\1', "g");
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push(m[2]);
  return out;
}

// translate a CSS selector into the substrings index.html must contain for it to resolve
function requiredTokens(sel) {
  const tokens = [];
  // attribute selectors: [data-get="/api/health"], [type="submit"]
  const attrRe = /\[([^\]=]+)=(["'])((?:\\.|(?!\2).)*)\2\]/g;
  let am;
  while ((am = attrRe.exec(sel))) tokens.push(`${am[1]}=${am[2]}${am[3]}${am[2]}`);
  // id selectors: #demo, #vendorForm  ->  id="demo"
  const idRe = /#([A-Za-z][\w-]*)/g;
  let im;
  while ((im = idRe.exec(sel))) tokens.push(`id="${im[1]}"`);
  // class selectors: .section__head  ->  bare class token must appear in markup
  const clsRe = /\.([A-Za-z][\w-]*)/g;
  let cm;
  while ((cm = clsRe.exec(sel))) tokens.push(cm[1]);
  return tokens;
}

test("STEPS holds the expected number of presenter steps", () => {
  const targets = selectorsFrom(present, "target");
  assert.equal(targets.length, EXPECTED_STEPS, `expected ${EXPECTED_STEPS} target steps, got ${targets.length}`);
});

test("the card count uses STEPS.length so the displayed total stays in sync", () => {
  assert.match(present, /Step\s*"\s*\+\s*\(found\.i\s*\+\s*1\)\s*\+\s*"\s*of\s*"\s*\+\s*STEPS\.length/,
    "count line must compute 'Step X of ' + STEPS.length");
});

test("every step target/fire selector resolves to markup in index.html", () => {
  const sels = [...selectorsFrom(present, "target"), ...selectorsFrom(present, "fire")];
  assert.ok(sels.length >= EXPECTED_STEPS, "should have parsed at least the target selectors");
  const missing = [];
  for (const sel of sels) {
    for (const tok of requiredTokens(sel)) {
      if (!html.includes(tok)) missing.push(`${sel}  ->  missing token: ${tok}`);
    }
  }
  assert.equal(missing.length, 0, "selector tokens not found in index.html:\n" + missing.join("\n"));
});

test("no em/en dashes anywhere in present.js (ASCII hyphen only)", () => {
  const offenders = [];
  present.split("\n").forEach((line, i) => {
    if (DASH.test(line)) offenders.push(`present.js:${i + 1}: ${line.trim().slice(0, 80)}`);
  });
  assert.equal(offenders.length, 0, "em/en dash(es) found:\n" + offenders.join("\n"));
});

test("presenter card is a role=dialog aria-modal (a11y parity with the tour)", () => {
  assert.match(present, /role:\s*"dialog"/, "card must declare role dialog");
  assert.match(present, /"aria-modal":\s*"true"/, "card must be aria-modal");
});

test("the offer popout exposes the documented actions and copy", () => {
  assert.match(present, /Start guided presentation/, "offer must offer to start the presentation");
  assert.match(present, /Not now/, "offer must let the user decline");
  assert.match(present, /nw_pres_offer_dismissed/, "offer dismissal must use the per-session sessionStorage key");
});

test("present.js is loaded in index.html after tour.js", () => {
  const tourIdx = html.indexOf('src="tour.js"');
  const presIdx = html.indexOf('src="present.js"');
  assert.ok(tourIdx !== -1, "tour.js script tag present");
  assert.ok(presIdx !== -1, "present.js script tag present");
  assert.ok(presIdx > tourIdx, "present.js must load after tour.js");
});

test("the manual launch button and presenter CSS namespace exist", () => {
  assert.match(html, /id="startPresBtn"/, "manual Guided presentation launch button present in markup");
  assert.match(css, /\.nwpres__card/, "presenter coachmark CSS (.nwpres__card) present");
});
