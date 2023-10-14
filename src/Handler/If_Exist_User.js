const Conn = require("../DB/conn");

const If_Exist_User = async (InputValue) => {
  //const sql = "INSERT INTO usuarios (email, senha) VALUES ($1, $2)";
  const sql2 = "SELECT email,senha FROM usuarios WHERE email = $1";
  try {
    const result = await Conn.query(sql2, [InputValue]);
    if (result.rows == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = If_Exist_User;
