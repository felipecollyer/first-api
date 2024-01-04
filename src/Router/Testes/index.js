const Express = require("express");
const RouterTeste = Express.Router();
const ControllerTeste = require("../../Controller/Testes/teste");

RouterTeste.get("/dropTable", ControllerTeste.DropDB);
RouterTeste.get("/createTable", ControllerTeste.CreateDB);
RouterTeste.get("/allUser", ControllerTeste.AllUser);
RouterTeste.get("/createUsuarios", ControllerTeste.CreateUser);

module.exports = RouterTeste;
