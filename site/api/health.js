"use strict";
const { send, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  send(res, 200, {
    ok: true,
    project: "Northwind CSF 2.0 GRC Assessment",
    mode: "simulated-portfolio",
    dataSource: "local repository data",
    timestamp: new Date().toISOString(),
  });
});
