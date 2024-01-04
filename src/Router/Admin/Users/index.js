const Express = require("express");
const UsersRouter = Express.Router();
const { AdminController } = require("../../../Controller");

UsersRouter.get("/usuarios", AdminController.buscarTodos);
UsersRouter.get("/usuarios/:id", AdminController.buscarOne);

// UsersRouter.get("/usuarios/:id", Controler.buscarTodos);
// UsersRouter.post("/usuarios/:id/editar", Controler.buscarTodos);
// UsersRouter.patch("/usuarios/:id", Controler.buscarTodos);
// UsersRouter.delete("/usuarios/:id", Controler.buscarTodos);

module.exports = UsersRouter;
