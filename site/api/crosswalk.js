"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, query, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  const q = query(req);
  const result = S.filterCrosswalk(GRC.CROSSWALK, { fn: q.fn, sub: q.sub, framework: q.framework });
  send(res, 200, {
    ok: true,
    filters: { fn: q.fn || null, sub: q.sub || null, framework: q.framework || null },
    note: "Four frameworks are mapped at row level: NIST 800-53, ISO 27001:2022, SOC 2, and HIPAA. No HITRUST row-level identifiers are exposed by this endpoint.",
    ...result,
  });
});
