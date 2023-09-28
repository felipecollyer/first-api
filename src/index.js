const express = require("express");
const app = express();
const conn = require("./DB/conn");
const port = 3000;
const route = require("./Router");

app.use("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
