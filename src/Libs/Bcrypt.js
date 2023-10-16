require("dotenv").config();
const Bcrypt = require("bcrypt");
const saltRounds = 10;

const Create_Hash = async (senha) => {
  const Hash = await Bcrypt.hash(senha, saltRounds);

  return Hash;
};

const Read_Hash = async (senha, senhaCrypt) => {
  try {
    const Check = await Bcrypt.compare(senha, senhaCrypt);

    return Check;
  } catch (error) {
    throw error;
  }
};

module.exports = { Create_Hash, Read_Hash };
