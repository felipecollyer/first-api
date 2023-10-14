require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const Create_Token = (id) => {
  return JWT.sign(
    {
      data: id,
    },
    secret,
    { expiresIn: "1h" }
  );
};

module.exports = Create_Token;
