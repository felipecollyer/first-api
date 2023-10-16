const Express = require("express");
const UserRouter = Express.Router();
const Controler = require("../Controller/User");
const Middlewares = require("../Middlewares");

UserRouter.post("/user", Controler.Create_User);

UserRouter.get("/user", Controler.Read_User);

UserRouter.put("/user/:id", Controler.Update_User);

UserRouter.delete("/user/:id", Controler.DeleteUser);

UserRouter.get("/authorization", Middlewares.Verify_Token, Controler.authorization);

UserRouter.get("/all-user", Controler.all_User_test);

module.exports = UserRouter;