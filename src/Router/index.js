var express = require("express");
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/user", function (req, res) {
  res.send("Read user");
});

router.post("/user", function (req, res) {
  res.send("Create user");
});

router.put("/user", function (req, res) {
  res.send("Update user");
});

router.delete("/user", function (req, res) {
  res.send("Delete user");
});

module.exports = router;
