"use strict";
/* Regression guard for SEC-01: the global response headers in vercel.json must
   include a Content-Security-Policy (default-src 'self' + frame-ancestors) and HSTS. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const vercel = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "vercel.json"), "utf8"));

function globalHeaders() {
  const block = (vercel.headers || []).find((h) => h.source === "/(.*)");
  assert.ok(block, "global '/(.*)' header block present");
  return Object.fromEntries(block.headers.map((h) => [h.key.toLowerCase(), h.value]));
}

test("vercel.json sets a Content-Security-Policy with default-src and frame-ancestors", () => {
  const csp = globalHeaders()["content-security-policy"];
  assert.ok(csp, "Content-Security-Policy header present");
  assert.match(csp, /default-src\s+'self'/, "CSP locks default-src to 'self'");
  assert.match(csp, /frame-ancestors\s+'self'/, "CSP sets frame-ancestors");
});

test("SEC-02: script-src has no 'unsafe-inline' and pins the inline theme script by sha256 hash", () => {
  const csp = globalHeaders()["content-security-policy"];
  const scriptSrc = (csp.match(/script-src\s+([^;]+)/) || [])[1] || "";
  assert.ok(scriptSrc, "CSP declares a script-src directive");
  assert.doesNotMatch(scriptSrc, /'unsafe-inline'/, "script-src must NOT allow 'unsafe-inline'");

  // Recompute the hash of the actual first inline <script> in index.html and prove
  // the CSP pins THAT exact byte sequence. If the script body ever drifts, this fails.
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const body = (html.match(/<script>([\s\S]*?)<\/script>/) || [])[1];
  assert.ok(body, "index.html still contains the inline theme-init script");
  const expected = "'sha256-" + crypto.createHash("sha256").update(body, "utf8").digest("base64") + "'";
  assert.ok(scriptSrc.includes(expected), `script-src must pin the live inline script hash (${expected})`);
});

test("vercel.json keeps the existing hardening headers + HSTS", () => {
  const h = globalHeaders();
  assert.equal(h["x-content-type-options"], "nosniff");
  assert.equal(h["x-frame-options"], "SAMEORIGIN");
  assert.match(h["strict-transport-security"] || "", /max-age=\d+/, "HSTS present");
});
