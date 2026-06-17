"use strict";
const GRC = require("../data.js");
const { send, query, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  const q = query(req);
  let items = (GRC.EVIDENCE || []).slice();
  if (q.status) items = items.filter((e) => String(e.status).toLowerCase() === String(q.status).toLowerCase());
  if (q.sub)    items = items.filter((e) => String(e.map).toLowerCase().includes(String(q.sub).toLowerCase()));
  const byStatus = items.reduce((a, e) => { a[e.status] = (a[e.status] || 0) + 1; return a; }, {});
  send(res, 200, {
    ok: true,
    count: items.length,
    byStatus,
    evidence: items.map((e) => ({
      evidenceId: e.id, artifact: e.artifact, mapping: e.map,
      type: e.type, portfolioStatus: e.status, notes: e.note,
    })),
    disclaimer: "Evidence items are simulated/portfolio artifacts for a fictional organization.",
  });
});
