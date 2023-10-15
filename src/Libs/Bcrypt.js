require("dotenv").config();
const saltRounds = 10;
const Bcrypt = require("bcrypt");

const Create_Hash = async () => {
  const Salt = await Bcrypt.genSalt(saltRounds);
  const Hash = await Bcrypt.hash(process.env.BCRYP_SECRET, Salt);

  return Hash;
};

module.exports = Create_Hash;
