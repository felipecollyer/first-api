var express = require("express");
const conn = require("../DB/conn");
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/user", function (req, res) {
  res.send("Read user");
});

router.get("/test", function (req, res) {
  res.send("xxxx user");
});

router.post("/user", async function (req, res) {
  const payload = req.body;

  const sql = `INSERT INTO usuarios (email, senha) VALUES ('${payload.email}','${payload.password}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("deu bom");
      res.end();
    }
  });
});

router.put("/user", function (req, res) {
  res.send("Update user");
});

router.delete("/user", function (req, res) {
  res.send("Delete user");
});

module.exports = router;
