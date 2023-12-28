const Conn = require("../DB/conn");
const Bcrypt = require("../Libs/Bcrypt");

class TestController {
  static async DropDB(req, res) {
    const sql = `DROP TABLE usuarios`;
    try {
      const Result = await Conn.query(sql);
      return res.status(200).json({ data: "Tabela dropada" });
    } catch (error) {
      throw error;
    }
  }

  static async CreateDB(req, res) {
    const sql = `CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      senha VARCHAR(255) NOT NULL,
      acesso VARCHAR(40) NOT NULL
  )`;

    try {
      const Result = await Conn.query(sql);
      return res.status(200).json({ data: `Tabela criada` });
    } catch (error) {
      throw error;
    }
  }

  static async AllUser(req, res) {
    const sql = ` SELECT * FROM usuarios`;

    try {
      const Result = await Conn.query(sql);
      return res.status(200).json({ data: Result.rows });
    } catch (error) {
      throw error;
    }
  }

  static async CreateUser(req, res) {
    let i = 1;
    const sql = "INSERT INTO usuarios (nome, senha) VALUES ($1, $2)";

    try {
      for (i = 1; i < 10; i++) {
        const nome = `teste-${i}`;
        const senha = `teste-${i}`;
        const senhacrypt = await Bcrypt.CreatePassword(senha);
        const result = await Conn.query(sql, [`${nome}`, `${senhacrypt}`]);
      }
      res.status(200).json({ data: `Usuarios  criados` });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TestController;
