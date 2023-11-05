const Express = require("express");
const Middlewares = Express();
const Jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const CheckToken = Middlewares.use(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "Token não fornecido" });
  } else {
    const token = authorization.split(" ")[1];
    try {
      req.dataToken = await Jwt.verify(token, secret);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido", error });
    }
  }
});

module.exports = CheckToken;
