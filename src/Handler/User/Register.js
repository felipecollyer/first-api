const Conn = require("../../DB/conn");

const Register = async (email, createPasswordCrypt) => {
  const sql = "INSERT INTO usuarios (email, senha) VALUES ($1, $2)";

  try {
    const result = await Conn.query(sql, [email, createPasswordCrypt]);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = Register;
