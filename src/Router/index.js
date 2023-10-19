const Express = require("express");
const teste = Express.Router();
const Controler = require("../Controller/User");
const Middlewares = require("../Middlewares");

teste.get("/teste", (req, res) => {
  const filter = req.query.filter;
  res.send("200").json({ msg: "ok" });
});

module.exports = teste;
