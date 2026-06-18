#!/usr/bin/env node
"use strict";
/* ============================================================================
   scrub_em_dashes.js - scan (and optionally fix) em-dashes (U+2014) and
   en-dashes (U+2013) across the whole site, then replace them with an ASCII
   hyphen "-". Enforces the project's hard "ASCII hyphen only" guardrail.

   It checks BOTH layers the brief calls out:
     1. STATIC MODE  - every text source file under site/ (html, css, js, json,
                       md, sh, py, txt), reported as file:line:col.
     2. LIVE DEMO    - the RENDERED output of every tab, reproduced without a
                       browser by exercising the same data.js graph + scoring.js
                       endpoints the demo calls (Posture, Risk, Controls,
                       Crosswalk, Vendors, Evidence, Score, Assessment).

   Usage (run from site/, or anywhere - paths resolve to site root):
     node scripts/scrub_em_dashes.js            # scan only; exit 1 if any found
     node scripts/scrub_em_dashes.js --fix      # replace in source, then re-scan
     node scripts/scrub_em_dashes.js --static   # static files only
     node scripts/scrub_em_dashes.js --rendered # rendered tabs only
   ========================================================================== */
const fs = require("node:fs");
const path = require("node:path");

const SITE = path.resolve(__dirname, "..");
const DASH = /[\u2013\u2014]/g; // U+2013 en-dash, U+2014 em-dash (escaped so this tool stays ASCII-clean)

const argv = new Set(process.argv.slice(2));
const FIX = argv.has("--fix");
const ONLY_STATIC = argv.has("--static");
const ONLY_RENDERED = argv.has("--rendered");

const SKIP_DIRS = new Set(["node_modules", ".git", ".vercel", "ChatGPT_Review_Flat", ".planning", ".letta"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".json", ".md", ".sh", ".py", ".txt", ".mjs", ".cjs", ".csv", ".tsv", ".yml", ".yaml"]);

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".DS_Store")) continue;
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walk(path.join(dir, ent.name), out);
    } else if (TEXT_EXT.has(path.extname(ent.name))) {
      out.push(path.join(dir, ent.name));
    }
  }
  return out;
}

/* ---------- STATIC SCAN ---------- */
function scanStatic() {
  const hits = [];
  for (const file of walk(SITE, [])) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      let m;
      DASH.lastIndex = 0;
      while ((m = DASH.exec(line))) {
        hits.push({ file: path.relative(SITE, file), line: i + 1, col: m.index + 1, text: line.trim().slice(0, 90) });
      }
    });
  }
  return hits;
}

function fixStatic() {
  const changed = [];
  for (const file of walk(SITE, [])) {
    const src = fs.readFileSync(file, "utf8");
    if (DASH.test(src)) {
      DASH.lastIndex = 0;
      const count = (src.match(DASH) || []).length;
      fs.writeFileSync(file, src.replace(DASH, "-"));
      changed.push({ file: path.relative(SITE, file), count });
    }
  }
  return changed;
}

/* ---------- RENDERED / LIVE-DEMO SCAN ---------- */
// Deep-walk any value, yielding every string with the path that produced it.
function deepStrings(value, atPath, sink) {
  if (typeof value === "string") {
    DASH.lastIndex = 0;
    if (DASH.test(value)) sink.push({ at: atPath, text: value.slice(0, 120) });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => deepStrings(v, `${atPath}[${i}]`, sink));
  } else if (value && typeof value === "object") {
    for (const k of Object.keys(value)) deepStrings(value[k], `${atPath}.${k}`, sink);
  }
}

function scanRendered() {
  // Loaded fresh each run so --fix results are reflected on a re-scan.
  const dataPath = path.join(SITE, "data.js");
  const scorePath = path.join(SITE, "scoring.js");
  delete require.cache[require.resolve(dataPath)];
  delete require.cache[require.resolve(scorePath)];
  const GRC = require(dataPath);
  const S = require(scorePath);

  // Reproduce every tab's rendered payload (same calls the demo dispatch makes).
  const tabs = {
    "Assessment (Posture dial/header)": S.assessmentSummary(GRC),
    "Posture (maturity scoring)": S.scoreFromSubscores(GRC.SUBSCORES),
    "Risk register (all)": S.filterRisks(GRC.RISKS, {}),
    "Risk register (Critical)": S.filterRisks(GRC.RISKS, { level: "Critical" }),
    "Crosswalk (all rows)": S.filterCrosswalk(GRC.CROSSWALK, {}),
    "Crosswalk (HIPAA filter)": S.filterCrosswalk(GRC.CROSSWALK, { sub: "PR.AA-01", framework: "hipaa" }),
    "Crosswalk (unsupported framework note)": S.filterCrosswalk(GRC.CROSSWALK, { framework: "hitrust" }),
    "Vendors (Tier 1 critical)": S.vendorTier({ vendorName: "MedStream", dataTypes: ["ePHI"], productionAccess: true, subprocessors: true }),
    "Vendors (Tier 4 low)": S.vendorTier({ vendorName: "Acme", dataTypes: [], productionAccess: false }),
    "Source data graph (all tabs' content)": GRC,
  };

  const hits = [];
  for (const [tab, payload] of Object.entries(tabs)) {
    const sink = [];
    deepStrings(payload, "", sink);
    sink.forEach((s) => hits.push({ tab, at: s.at, text: s.text }));
  }
  return hits;
}

/* ---------- DRIVER ---------- */
function main() {
  console.log("em/en-dash scrub  (U+2013 en, U+2014 em -> '-')\n  site: " + SITE + "\n");
  let dirty = false;

  if (FIX) {
    const changed = fixStatic();
    if (changed.length) {
      console.log("FIXED static source files:");
      changed.forEach((c) => console.log(`  ${c.file}  (${c.count} replaced)`));
    } else {
      console.log("FIX: no static source files contained em/en dashes.");
    }
    console.log("");
  }

  if (!ONLY_RENDERED) {
    const stat = scanStatic();
    console.log(`STATIC MODE: scanned source files -> ${stat.length} em/en dash occurrence(s)`);
    stat.forEach((h) => console.log(`  ${h.file}:${h.line}:${h.col}  ${h.text}`));
    if (stat.length) dirty = true;
    console.log("");
  }

  if (!ONLY_STATIC) {
    const rendered = scanRendered();
    console.log(`LIVE DEMO (all tabs): scanned rendered payloads -> ${rendered.length} em/en dash occurrence(s)`);
    rendered.forEach((h) => console.log(`  [${h.tab}] ${h.at}  ${h.text}`));
    if (rendered.length) dirty = true;
    console.log("");
  }

  if (dirty) {
    console.log("RESULT: em/en dashes present." + (FIX ? " (rendered hits come from data; re-run without --fix is clean once source is fixed)" : " Run with --fix to replace them."));
    process.exit(1);
  }
  console.log("RESULT: clean. No em/en dashes in static source or any rendered tab.");
}

main();
