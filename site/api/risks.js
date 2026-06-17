"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, query, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  const q = query(req);
  const result = S.filterRisks(GRC.RISKS, {
    level: q.level, owner: q.owner, sub: q.sub, minScore: q.minScore,
  });
  send(res, 200, {
    ok: true,
    filters: { level: q.level || null, owner: q.owner || null, sub: q.sub || null, minScore: q.minScore || null },
    ...result,
    disclaimer: "Simulated risks for a fictional organization.",
  });
});
