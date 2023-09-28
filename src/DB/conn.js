const { Client } = require("pg");

const conn = new Client({
  user: "postgres",
  password: "123456",
  database: "postgres",
  host: "localhost", // ou o endereço do servidor do PostgreSQL
  port: 5432,
})
  .connect()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados PostgreSQL");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

module.exports = conn;
