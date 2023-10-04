const Express = require("express");
const Middlewares = require("../Middlewares");
const Router = Express.Router();
const Controler = require("../Controller/User");

Router.get("/user", Middlewares.log1, Controler.ReadAllUser);

Router.get("/user/:id", Middlewares.log2, Controler.ReadOneUser);

Router.post("/user", Controler.Createuser);

Router.put("/user/:id", Controler.UpdateUser);

Router.delete("/user/:id", Controler.DeleteUser);

module.exports = Router;
