const Express = require("express");
const AcessoRouter = Express.Router();
const Controler = require("../Controller/Acesso");
const Middlewares = require("../Middlewares");

AcessoRouter.get("/funcionarios", Controler.buscarTodos);

module.exports = AcessoRouter;
