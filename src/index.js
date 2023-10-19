require("dotenv").config();
const Express = require("express");
const App = Express();
const Database = require("./DB/conn");
const Port = process.env.PORT;
const teste = require("./Router");
const Json = require("./Middlewares/Json");
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger");

App.use(Json);

//App.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
App.use("/", teste);

Database.connect()
  .then(() => {
    console.log("conectado ao banco de dados:");
  })
  .catch((erro) => console.log("ERROR:"));

App.listen(Port, () => {
  console.log(`Servidor rodando em variavel de ambiente!`);
});
