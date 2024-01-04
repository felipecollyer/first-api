const Conn = require("../../DB/conn");

const Read = async (InputValue) => {
  const sql = `SELECT * FROM usuarios WHERE email = $1`;

  try {
    const Result = await Conn.query(sql, [InputValue]);
    return Result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = Read;
