var express = require("express");
const conn = require("../DB/conn");
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/user", function (req, res) {
  const sql = "SELECT * FROM usuarios";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log("errow");
    } else {
      res.send(data.rows);
    }
  });
});

router.get("/user/:id", function (req, res) {
  const idParams = req.params.id;

  const sql = `SELECT * FROM usuarios WHERE id =${idParams}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log("errow");
    } else {
      res.send(data.rows);
    }
  });
});

router.post("/user", async function (req, res) {
  const payload = req.body;

  const sql = `INSERT INTO usuarios (email, senha) VALUES ('${payload.email}','${payload.senha}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(`Usuario ${payload.email} criado com sucesso`);
    }
  });
});

router.put("/user/:id", function (req, res) {
  const { id } = req.params;
  const { email, senha } = req.body;

  const sql = `UPDATE usuarios SET email = '${email}', senha = '${senha}' WHERE id = ${id} RETURNING *`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Dados atualizados");
    }
  });
});

router.delete("/user/:id", function (req, res) {
  const { id } = req.params;

  const sql = `DELETE FROM usuarios WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(`Usuario com ID ${id}, deletado!`);
    }
  });
});

module.exports = router;
