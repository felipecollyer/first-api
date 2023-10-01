const Conn = require("../DB/conn");

module.exports = class User {
  static Createuser(req, res) {
    const payload = req.body;

    const sql = `INSERT INTO usuarios (email, senha) VALUES ('${payload.email}','${payload.senha}')`;

    Conn.query(sql, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send(`Usuario ${payload.email} criado com sucesso`);
      }
    });
  }

  static ReadOneUser(req, res) {
    const idParams = req.params.id;

    const sql = `SELECT * FROM usuarios WHERE id =${idParams}`;

    Conn.query(sql, (err, data) => {
      if (err) {
        console.log("errow");
      } else {
        res.send(data.rows);
      }
    });
  }

  static ReadAllUser(req, res) {
    const sql = "SELECT * FROM usuarios";

    Conn.query(sql, (err, data) => {
      if (err) {
        console.log("errow");
      } else {
        res.send(data.rows);
      }
    });
  }

  static UpdateUser(req, res) {
    const { id } = req.params;
    const { email, senha } = req.body;

    const sql = `UPDATE usuarios SET email = '${email}', senha = '${senha}' WHERE id = ${id} RETURNING *`;

    Conn.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Dados atualizados");
      }
    });
  }

  static DeleteUser(req, res) {
    const { id } = req.params;

    const sql = `DELETE FROM usuarios WHERE id = ${id}`;

    Conn.query(sql, (err, data) => {
      if (err) {
        console.log("error", err);
      } else {
        res.send(`Usuario com ID ${id}, deletado!`);
      }
    });
  }
};
