const Conn = require("../../DB/conn");

const Register = async (email, createPasswordCrypt) => {
  const sql = "INSERT INTO usuarios (email, senha, acesso) VALUES ($1, $2, $3)";

  try {
    const result = await Conn.query(sql, [
      email,
      createPasswordCrypt,
      "pendente",
    ]);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = Register;
