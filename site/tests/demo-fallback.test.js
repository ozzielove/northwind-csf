"use strict";
/* Regression guard for DEMO-01: callApi() must treat an HTTP error (e.g. a 404/500
   from static hosting with no backend) or a non-JSON body as OFFLINE and serve the
   bundled localFallback() data - NOT dump the raw error page into the demo panel
   labeled "live API". fetch() does not reject on 4xx/5xx, so the success path must
   guard on res.ok and JSON-parseability.

   This is behavioral: it extracts the SHIPPED callApi source from app.js (by brace
   matching) and runs it in a sandbox with a mocked fetch + sentinel localFallback,
   so reverting the res.ok guard fails the test. No browser / jsdom required. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

// Extract `async function callApi(...) { ... }` by brace-matching from its signature.
function extractFn(src, signature) {
  const start = src.indexOf(signature);
  assert.notEqual(start, -1, "could not find " + signature + " in app.js");
  const open = src.indexOf("{", start);
  let depth = 0, i = open;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return src.slice(start, i);
}

const callApiSrc = extractFn(app, "async function callApi(");

// Build a sandboxed callApi with injected dependencies. apiOnline is module-scoped
// in app.js; we declare it locally so the extracted body's assignments resolve.
function buildCallApi(fetchImpl) {
  const FALLBACK = { _fallback: true, ok: true, mode: "static-fallback" };
  const factory = new Function(
    "fetch", "localFallback", "AbortController", "setTimeout", "clearTimeout",
    "let apiOnline = null;\n" + callApiSrc + "\nreturn { callApi, getOnline: () => apiOnline };"
  );
  const api = factory(
    fetchImpl,
    () => FALLBACK,
    class { constructor() { this.signal = {}; } abort() {} },
    () => 0,
    () => {}
  );
  return { ...api, FALLBACK };
}

test("DEMO-01: a 404 (static host, no backend) serves bundled fallback, not raw HTML", async () => {
  const html404 = "<!DOCTYPE HTML>\n<html><head></head><body>404 File not found</body></html>";
  const { callApi, FALLBACK } = buildCallApi(async () => ({
    ok: false, status: 404, text: async () => html404,
  }));
  const r = await callApi("/api/assessment", "GET");
  assert.equal(r.live, false, "a 404 must be reported as not-live (offline)");
  assert.deepEqual(r.json, FALLBACK, "must return localFallback() data, not the 404 page");
  assert.ok(!String(JSON.stringify(r.json)).includes("404"), "raw error page must not leak through");
});

test("DEMO-01: a 500 with a non-JSON body also falls back", async () => {
  const { callApi, FALLBACK } = buildCallApi(async () => ({
    ok: false, status: 500, text: async () => "Internal Server Error",
  }));
  const r = await callApi("/api/risks", "GET");
  assert.equal(r.live, false);
  assert.deepEqual(r.json, FALLBACK);
});

test("DEMO-01: a real 200 JSON response is still treated as live", async () => {
  const { callApi } = buildCallApi(async () => ({
    ok: true, status: 200, text: async () => JSON.stringify({ ok: true, value: 42 }),
  }));
  const r = await callApi("/api/assessment", "GET");
  assert.equal(r.live, true, "a healthy JSON 200 must remain live");
  assert.equal(r.json.value, 42);
});

test("DEMO-01: a network failure (fetch rejects) falls back", async () => {
  const { callApi, FALLBACK } = buildCallApi(async () => { throw new Error("network down"); });
  const r = await callApi("/api/health", "GET");
  assert.equal(r.live, false);
  assert.deepEqual(r.json, FALLBACK);
});
