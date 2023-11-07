const Express = require("express");
const RouterTeste = Express.Router();
const ControllerTeste = require("../Controller/teste");

RouterTeste.get("/teste/dropTable", ControllerTeste.DropDB);
RouterTeste.get("/teste/createTable", ControllerTeste.CreateDB);
RouterTeste.get("/teste/allUser", ControllerTeste.AllUser);
RouterTeste.get("/teste/createUsuarios", ControllerTeste.CreateUser);

module.exports = RouterTeste;
