const express = require("express");
const app = express();
const database = require("./DB/conn");
const port = 3000;
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
  .catch((erro) => console.log("ERROR:", erro));

app.listen(port, () => {
  console.log(`Servidor rodando na port:${port}`);
});
