require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./DB/conn");
const port = process.env.PORT;
const route = require("./Router");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/", route);

database
  .connect()
  .then(() => {
    console.log("conectado ao banco de dados:");
  })
  .catch((erro) => console.log("ERROR:"));

app.listen(port, () => {
  console.log(`Servidor rodando em variavel de ambiente!`);
});
