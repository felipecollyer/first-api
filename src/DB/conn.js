const { Client } = require("pg");

const conn = new Client({
  user: "postgres",
  password: "felipe",
  database: "first_api",
  host: "localhost", // ou o endereço do servidor do PostgreSQL
  port: 5432,
});

module.exports = conn;
