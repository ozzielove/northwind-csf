"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, readBody, handler } = require("../apiutil.js");

/* POST body: { subscores: [[fn, sub, score], ...] }.
   With no body, scores the shipped 23-subcategory data set (overall → 1.57). */
module.exports = handler(["POST", "GET"], async (req, res) => {
  const body = req.method === "POST" ? await readBody(req) : {};
  const subscores = Array.isArray(body.subscores) && body.subscores.length ? body.subscores : GRC.SUBSCORES;
  const usedSample = subscores === GRC.SUBSCORES;
  let result;
  try {
    result = S.scoreFromSubscores(subscores);
  } catch (err) {
    return send(res, 400, {
      ok: false,
      error: String(err && err.message ? err.message : err),
      disclaimer: "Simulated portfolio scoring input rejected; valid subcategory scores are 1 through 4."
    });
  }
  send(res, 200, {
    ok: true,
    source: usedSample ? "shipped sample data (23 subcategories)" : "request body",
    perFunction: result.functions,
    overallMaturity: result.overall,
    overallTier: result.overallTier,
    assessedSubcategories: result.assessedSubcategories,
    priorityFunctions: result.priorityFunctions,
    method: result.method,
    kpi: result.kpi,
    disclaimer: "Simulated portfolio scoring. Overall is subcategory-weighted, not a simple mean of Function averages.",
  });
});
