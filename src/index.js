require("dotenv").config();
const Express = require("express");
const App = Express();
const Database = require("./DB/conn");
const Port = process.env.PORT;
const Route = require("./Router");
const Json = require("./Middlewares/Json");

App.use(Json);
App.use("/", Route);

Database.connect()
  .then(() => {
    console.log("conectado ao banco de dados:");
  })
  .catch((erro) => console.log("ERROR:"));

App.listen(Port, () => {
  console.log(`Servidor rodando em variavel de ambiente!`);
});
