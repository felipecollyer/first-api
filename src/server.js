require("dotenv").config();
require("express-async-errors");

const Express = require("express");
const App = Express();
const database = require("./DB/conn");
const Port = process.env.PORT;
const Json = require("./Middlewares/Json");
const Routers = require("./Router/index");

App.use(Json);
App.use(Routers);
App.use((error, request, response, next) => {
  return response.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

// const swaggerUi = require("swagger-ui-express");
// const swaggerFileOut = require("../swagger.json");
// App.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFileOut));

database
  .connect()
  .then(() => {
    console.log("conectado ao banco de dados.");
  })
  .catch((erro) => console.log("ERROR :", erro));

App.listen(Port, () => {
  console.log(`Servidor rodando em variavel de ambiente!`);
});
