const Conn = require("../../DB/conn");

const Register = async (InputValue) => {
  const sql = "INSERT INTO usuarios (email, senha) VALUES ($1, $2)";

  try {
    const result = await Conn.query(sql, InputValue);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = Register;
