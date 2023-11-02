require("dotenv").config();
const Express = require("express");
const Jwt = require("jsonwebtoken");
const Middlewares = Express();
const secret = "token-secreto";

const Verify_Token = Middlewares.use(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  const token = authorization.split(" ")[1];

  try {
    const tokenPayload = await Jwt.verify(token, secret);

    req.dataToken = tokenPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido", error });
  }
});

module.exports = Verify_Token;
