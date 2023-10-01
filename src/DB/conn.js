require("dotenv").config();
const { Client } = require("pg");

const conn = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: "localhost", // ou o endereço do servidor do PostgreSQL
  port: 5432,
});

module.exports = conn;
