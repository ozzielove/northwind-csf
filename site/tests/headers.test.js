"use strict";
/* Regression guard for SEC-01: the global response headers in vercel.json must
   include a Content-Security-Policy (default-src 'self' + frame-ancestors) and HSTS. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

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

test("vercel.json keeps the existing hardening headers + HSTS", () => {
  const h = globalHeaders();
  assert.equal(h["x-content-type-options"], "nosniff");
  assert.equal(h["x-frame-options"], "SAMEORIGIN");
  assert.match(h["strict-transport-security"] || "", /max-age=\d+/, "HSTS present");
});
