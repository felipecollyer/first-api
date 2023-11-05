require("dotenv").config();

const Express = require("express");
const App = Express();
const Database = require("./DB/conn");
const Port = process.env.PORT;
const Json = require("./Middlewares/Json");

const RouterUser = require("./Router/index");
App.use(Json);
App.use("/", RouterUser);

const swaggerUi = require("swagger-ui-express");
const swaggerFileOut = require("../swagger.json");
App.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFileOut));

Database.connect()
  .then(() => {
    console.log("conectado ao banco de dados:", Port);
  })
  .catch((erro) => console.log("ERROR :", erro));

App.listen(Port, () => {
  console.log(`Servidor rodando em variavel de ambiente!`);
});
