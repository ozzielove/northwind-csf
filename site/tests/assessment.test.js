"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");

const GRC = require("../data.js");
const S = require("../scoring.js");

test("assessment data exists", () => {
  assert.ok(GRC && GRC.ASSESSMENT, "ASSESSMENT present");
  assert.equal(GRC.ASSESSMENT.org, "Northwind Health Systems");
});

test("six CSF Functions exist", () => {
  assert.equal(GRC.FUNCTIONS.length, 6);
  assert.deepEqual(GRC.FUNCTIONS.map((f) => f.key), ["GV", "ID", "PR", "DE", "RS", "RC"]);
});

test("23 assessed subcategories", () => {
  assert.equal(GRC.SUBSCORES.length, 23);
  assert.equal(GRC.ASSESSMENT.subcategories, 23);
});

test("weighted overall maturity rounds to 1.57", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  assert.equal(r.overall, 1.57);
  assert.equal(r.assessedSubcategories, 23);
  assert.equal(r.overallTier, "Tier 2 · Risk Informed");
});

test("weighted overall differs from the simple mean of Function means", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  assert.equal(r.kpi.simpleMeanOfFunctions, 1.53);
  assert.notEqual(r.overall, r.kpi.simpleMeanOfFunctions);
});

test("per-Function scores match the published figures", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  const byKey = Object.fromEntries(r.functions.map((f) => [f.key, f.score]));
  assert.deepEqual(byKey, { GV: 1.4, ID: 1.6, PR: 2.0, DE: 1.33, RS: 1.33, RC: 1.5 });
});

test("priority Functions are Detect and Respond (the 1.33 floor)", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  assert.deepEqual(r.priorityFunctions.sort(), ["Detect", "Respond"]);
});

test("risk register contains 10 risks with 3 critical", () => {
  assert.equal(GRC.RISKS.length, 10);
  const crit = S.filterRisks(GRC.RISKS, { level: "Critical" });
  assert.equal(crit.count, 3);
  assert.deepEqual(crit.risks.map((r) => r.id), ["R-001", "R-002", "R-003"]);
});

test("risk minScore filter works", () => {
  const r = S.filterRisks(GRC.RISKS, { minScore: 12 });
  assert.equal(r.count, 8);
  assert.ok(r.risks.every((x) => x.score >= 12));
});

test("crosswalk lookup for PR.AA-01 returns expected mappings", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, { sub: "PR.AA-01" });
  assert.equal(r.count, 1);
  assert.equal(r.rows[0].n8, "IA-2, IA-5");
  assert.match(r.rows[0].hi, /164\.312\(a\)\(2\)\(i\)/);
});

test("crosswalk exposes exactly four row-level frameworks", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, {});
  assert.equal(r.rowLevelFrameworks.length, 4);
  assert.deepEqual(r.rowLevelFrameworks, ["NIST 800-53", "ISO 27001:2022", "SOC 2", "HIPAA"]);
});

test("crosswalk framework filter returns a single mapping column", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, { sub: "PR.AA-01", framework: "hipaa" });
  assert.equal(r.framework, "HIPAA");
  assert.equal(r.rows[0].mapping, "§164.312(a)(2)(i)");
});

test("unsupported HITRUST framework filter returns no row-level mappings", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, { framework: "hitrust" });
  assert.equal(r.count, 0);
  assert.equal(r.unsupportedFramework, "hitrust");
  assert.deepEqual(r.rows, []);
});

test("vendor tiering: simulated ePHI + production-like access => Tier 1 Critical, BAA review required", () => {
  const v = S.vendorTier({ vendorName: "X", dataTypes: ["ePHI", "PII"], productionAccess: true, subprocessors: true });
  assert.equal(v.tier, "T1");
  assert.equal(v.label, "Critical");
  assert.equal(v.baaReviewRequired, true);
  assert.equal(v.soc2ReviewRequired, true);
  assert.equal(v.questionnaireRequired, true);
});

test("vendor tiering: no sensitive data, no access => Tier 4 Low", () => {
  const v = S.vendorTier({ vendorName: "Y", dataTypes: [], productionAccess: false, systemAccess: false });
  assert.equal(v.tier, "T4");
  assert.equal(v.baaReviewRequired, false);
});

test("scoreFromSubscores rejects out-of-range scores", () => {
  assert.throws(() => S.scoreFromSubscores([["GV", "GV.OC-01", 0]]), /invalid score/);
  assert.throws(() => S.scoreFromSubscores([["GV", "GV.OC-01", 9]]), /invalid score/);
});

test("scoreFromSubscores rejects an unknown Function", () => {
  assert.throws(() => S.scoreFromSubscores([["ZZ", "ZZ.OC-01", 2]]), /unknown Function/);
});

test("evidence log has nine items", () => {
  assert.equal(GRC.EVIDENCE.length, 9);
});

test("claim map covers every proof-type category", () => {
  const cats = new Set(GRC.CLAIMS.map((c) => c.cat));
  ["portfolio", "backend", "script", "docs", "coursework", "operations", "military"]
    .forEach((c) => assert.ok(cats.has(c), `missing category ${c}`));
});
