require("dotenv").config();
const { Client } = require("pg");

const Conn = new Client({
  user: "postgres",
  password: "felipe",
  database: "first_api",
  host: "localhost",
  port: 5432,
});

module.exports = Conn;
