require("dotenv").config();
const Express = require("express");
const Jwt = require("jsonwebtoken");
const Middlewares = Express();
const secret = process.env.JWT_SECRET;

const AuthenticateToken = Middlewares.use((req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  Jwt.verify(token, secret, function (err, decoded) {
    if (decoded) {
      console.log("autenticacao realizada");
      console.log(decoded.data);
      next();
    } else {
      console.log(err);
    }
  });
});

module.exports = AuthenticateToken;
