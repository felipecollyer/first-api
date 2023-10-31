const Conn = require("../../DB/conn");

const findOneUser = async (InputValue) => {
  const sql2 = "SELECT id, email, senha FROM usuarios WHERE email = $1";
  try {
    const Result = await Conn.query(sql2, [InputValue]);

    if (Result.rowCount == 0) {
      return false;
    } else {
      const user = {
        id: Result.rows[0].id,
        email: Result.rows[0].email,
        crypt: Result.rows[0].senha,
      };
      return user;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = findOneUser;
