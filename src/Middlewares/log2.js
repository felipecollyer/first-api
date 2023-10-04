const Express = require("express");
const Middlewares = Express();

const log2 = Middlewares.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  console.log("log-2");
  next();
});

module.exports = log2;
