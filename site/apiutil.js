/* ============================================================================
   apiutil.js — tiny request/response helpers shared by the /api functions.
   Lives at repo root (not /api) so Vercel never treats it as a route.
   No dependencies. Works under @vercel/node, `vercel dev`, and mock req/res.
   ========================================================================== */
"use strict";

function send(res, status, body) {
  if (status === 204) {
    if (typeof res.status === "function" && typeof res.end === "function") {
      res.setHeader("Cache-Control", "no-store");
      return res.status(status).end();
    }
    res.statusCode = status;
    res.setHeader("Cache-Control", "no-store");
    return res.end();
  }
  const payload = JSON.stringify(body, null, 2);
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(status).json(body);
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(payload);
}

function query(req) {
  if (req && req.query && typeof req.query === "object") return req.query;
  try {
    const u = new URL(req.url, "http://localhost");
    return Object.fromEntries(u.searchParams.entries());
  } catch (_) {
    return {};
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    if (typeof req.body === "string") {
      try { return resolve(JSON.parse(req.body || "{}")); } catch (_) { return resolve({}); }
    }
    let raw = "";
    try {
      req.on("data", (c) => (raw += c));
      req.on("end", () => { try { resolve(JSON.parse(raw || "{}")); } catch (_) { resolve({}); } });
      req.on("error", () => resolve({}));
    } catch (_) {
      resolve({});
    }
  });
}

/* Wrap a handler: enforce method, catch errors → 500 JSON. */
function handler(methods, fn) {
  const allowed = (Array.isArray(methods) ? methods : [methods]).map((m) => m.toUpperCase());
  return async (req, res) => {
    const method = (req.method || "GET").toUpperCase();
    if (method === "OPTIONS") { res.setHeader("Allow", allowed.join(", ")); return send(res, 204, {}); }
    if (!allowed.includes(method)) {
      res.setHeader("Allow", allowed.join(", "));
      return send(res, 405, { ok: false, error: `Method ${method} not allowed`, allow: allowed });
    }
    try {
      await fn(req, res);
    } catch (err) {
      send(res, 500, { ok: false, error: String(err && err.message ? err.message : err) });
    }
  };
}

module.exports = { send, query, readBody, handler };
