require("dotenv").config();
const Bcrypt = require("bcrypt");
const saltRounds = 10;

class BcryptClass {
  static async Create_Hash(senha) {
    const Hash = await Bcrypt.hash(senha, saltRounds);
    return Hash;
  }

  static async Read_Hash(senha, senhaCrypt) {
    try {
      const Check = await Bcrypt.compare(senha, senhaCrypt);
      return Check;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { BcryptClass };
