const Conn = require("../../DB/conn");

const findOneUser = async (email, method) => {
  const sql2 = "SELECT id, email, senha FROM usuarios WHERE email = $1";

  try {
    const Result = await Conn.query(sql2, [email]);

    if (Result.rowCount === 0) {
      return null;
    } else {
      if (method === "POST") {
        return true;
      }
      if (method === "GET") {
        const { id, email, senha } = Result.rows[0];
        const user = {
          id,
          email,
          crypt: senha,
        };
        return user;
      }
      if (method === "PUT") {
        const { email } = Result.rows[0];
        return email;
      }
    }
  } catch (error) {
    throw error;
  }
};

const findOneUserById = async (InputValue) => {
  const sql2 = "SELECT id, email, senha FROM usuarios WHERE id = $1";

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
    console.log(error);
    throw error;
  }
};

module.exports = { findOneUser, findOneUserById };
