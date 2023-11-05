const Bcrypt = require("bcrypt");
const salt = 10;

const CreatePassword = async (senha) => {
  try {
    const senhaCrypt = await Bcrypt.hash(senha, salt);
    return senhaCrypt;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = CreatePassword;
