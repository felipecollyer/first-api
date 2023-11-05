const Bcrypt = require("bcrypt");

const CheckPasswordUser = async (senha, senhaCrypt) => {
  try {
    const checkPassword = await Bcrypt.compare(senha, senhaCrypt);
    return checkPassword;
  } catch (error) {
    throw error;
  }
};

module.exports = CheckPasswordUser;
