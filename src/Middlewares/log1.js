const Express = require("express");
const Middlewares = Express();

const log1 = Middlewares.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  console.log("log-1");
  next();
});

module.exports = log1;
