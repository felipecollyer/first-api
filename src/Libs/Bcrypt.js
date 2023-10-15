require("dotenv").config();
const saltRounds = 10;
const Bcrypt = require("bcrypt");

const Create_Hash = async (senha) => {
  const Hash = await Bcrypt.hash(senha, saltRounds);

  return Hash;
};

const Read_Hash = async (senha, senhaCrypt) => {
  try {
    const Check = await Bcrypt.compare(senha, senhaCrypt);
    console.log(Check);
    return Check;
  } catch (error) {
    throw error;
  }

  //return Hash;
};

module.exports = { Create_Hash, Read_Hash };
