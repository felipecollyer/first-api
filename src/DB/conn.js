require("dotenv").config();
const { Client } = require("pg");

const Conn = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: "localhost",
  port: 5432,
});

module.exports = Conn;
