const Express = require("express");
const UserRouter = Express.Router();
const { UsersController } = require("../../Controller");
const Middlewares = require("../../Middlewares");

UserRouter.post("/user", UsersController.Create);
UserRouter.get("/user", UsersController.Read);
UserRouter.put("/user/:id", Middlewares.CheckToken, UsersController.Update);
UserRouter.delete(
  "/user/:id",
  Middlewares.CheckToken,
  UsersController.DeleteUser
);

// UserRouter.get(
//   "/authorization",
//   Middlewares.Verify_Token,
//   Controler.authorization
// );

// UserRouter.get("/all-user", Controler.all_test);

module.exports = UserRouter;
