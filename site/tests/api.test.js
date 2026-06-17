"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");

/* Invoke a serverless handler with a mock req/res and capture the JSON response. */
function invoke(handler, { method = "GET", url = "/", body } = {}) {
  return new Promise((resolve, reject) => {
    const res = {
      statusCode: 200,
      _headers: {},
      setHeader(k, v) { this._headers[k] = v; },
      end(payload) {
        let json = null;
        try { json = payload ? JSON.parse(payload) : {}; } catch (e) { return reject(e); }
        resolve({ status: this.statusCode, headers: this._headers, json });
      },
    };
    Promise.resolve(handler({ method, url, body }, res)).catch(reject);
  });
}

test("GET /api/health returns ok + simulated-portfolio mode", async () => {
  const { status, json } = await invoke(require("../api/health.js"));
  assert.equal(status, 200);
  assert.equal(json.ok, true);
  assert.equal(json.mode, "simulated-portfolio");
  assert.ok(json.timestamp);
});

test("GET /api/assessment returns the weighted overall 1.57", async () => {
  const { status, json } = await invoke(require("../api/assessment.js"));
  assert.equal(status, 200);
  assert.equal(json.overallMaturity, 1.57);
  assert.equal(json.functions, 6);
  assert.equal(json.assessedSubcategories, 23);
  assert.equal(json.risks, 10);
  assert.equal(json.rowLevelFrameworks, 4);
});

test("GET /api/risks?level=Critical returns three risks", async () => {
  const { json } = await invoke(require("../api/risks.js"), { url: "/api/risks?level=Critical" });
  assert.equal(json.count, 3);
  assert.equal(json.byLevel.Critical, 3);
});

test("GET /api/crosswalk?sub=PR.AA-01 returns one row, four frameworks", async () => {
  const { json } = await invoke(require("../api/crosswalk.js"), { url: "/api/crosswalk?sub=PR.AA-01" });
  assert.equal(json.count, 1);
  assert.equal(json.rows[0].n8, "IA-2, IA-5");
  assert.equal(json.rowLevelFrameworks.length, 4);
});

test("GET /api/crosswalk?framework=hitrust returns no row-level mappings", async () => {
  const { json } = await invoke(require("../api/crosswalk.js"), { url: "/api/crosswalk?framework=hitrust" });
  assert.equal(json.count, 0);
  assert.equal(json.unsupportedFramework, "hitrust");
  assert.deepEqual(json.rows, []);
});

test("POST /api/score with no body scores the shipped data to 1.57", async () => {
  const { json } = await invoke(require("../api/score.js"), { method: "POST", body: {} });
  assert.equal(json.overallMaturity, 1.57);
  assert.equal(json.assessedSubcategories, 23);
  assert.ok(Array.isArray(json.perFunction));
});

test("POST /api/score with custom subscores recomputes", async () => {
  const body = { subscores: [["GV", "GV.OC-01", 4], ["PR", "PR.AA-01", 2]] };
  const { json } = await invoke(require("../api/score.js"), { method: "POST", body });
  assert.equal(json.overallMaturity, 3); // (4+2)/2
  assert.equal(json.source, "request body");
});

test("POST /api/vendor-tier: simulated ePHI + production-like access => Tier 1 Critical", async () => {
  const body = { vendorName: "MedStream", dataTypes: ["ePHI"], productionAccess: true };
  const { json } = await invoke(require("../api/vendor-tier.js"), { method: "POST", body });
  assert.equal(json.tier, "T1");
  assert.equal(json.baaReviewRequired, true);
});

test("GET /api/evidence returns nine items", async () => {
  const { json } = await invoke(require("../api/evidence.js"));
  assert.equal(json.count, 9);
  assert.equal(json.evidence[0].evidenceId, "E-01");
});

test("disallowed method returns 405 with Allow header", async () => {
  const { status, headers } = await invoke(require("../api/health.js"), { method: "POST" });
  assert.equal(status, 405);
  assert.ok(headers.Allow.includes("GET"));
});
