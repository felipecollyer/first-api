const Express = require("express");
const Router = Express.Router();
const Controler = require("../Controller/User");

Router.post("/user", Controler.Create_User);

Router.get("/user", Controler.Read_User);

Router.put("/user/:id", Controler.Update_User);

Router.delete("/user/:id", Controler.DeleteUser);

Router.get("/all-user", Controler.all_User_test);

module.exports = Router;
