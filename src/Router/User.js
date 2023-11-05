const Express = require("express");
const UserRouter = Express.Router();
const Controler = require("../Controller/User");
const Middlewares = require("../Middlewares");

UserRouter.post("/user", Controler.Create);
UserRouter.get("/user", Controler.Read);
UserRouter.put("/user/:id", Middlewares.CheckToken, Controler.Update);
UserRouter.delete("/user/:id", Middlewares.CheckToken, Controler.DeleteUser);

// UserRouter.get(
//   "/authorization",
//   Middlewares.Verify_Token,
//   Controler.authorization
// );

// UserRouter.get("/all-user", Controler.all_test);

module.exports = UserRouter;
