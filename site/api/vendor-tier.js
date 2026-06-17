"use strict";
const S = require("../scoring.js");
const { send, readBody, handler } = require("../apiutil.js");

/* POST body: { vendorName, dataTypes:[], productionAccess, systemAccess, subprocessors } */
module.exports = handler(["POST", "GET"], async (req, res) => {
  const body = req.method === "POST" ? await readBody(req) : {
    vendorName: "MedStream Analytics (sample)", dataTypes: ["ePHI", "PII"],
    productionAccess: true, systemAccess: true, subprocessors: true,
  };
  send(res, 200, { ok: true, ...S.vendorTier(body) });
});
