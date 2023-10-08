const Express = require("express");
const Router = Express.Router();
const Controler = require("../Controller/User");

Router.get("/user", Controler.ReadAllUser);

Router.get("/user/:id", Controler.ReadOneUser);

Router.post("/user", Controler.Createuser);

Router.put("/user/:id", Controler.UpdateUser);

Router.delete("/user/:id", Controler.DeleteUser);

module.exports = Router;
