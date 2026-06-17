"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  send(res, 200, S.assessmentSummary(GRC));
});
