const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const CreateTokenJWT = (id) => {
  return JWT.sign(
    {
      data: id,
    },
    secret,
    { expiresIn: "1h" }
  );
};

module.exports = CreateTokenJWT;
