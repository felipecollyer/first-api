const Conn = require("../../DB/conn");

const FindAllUser = async () => {
  const sql = `SELECT id, email, acesso FROM usuarios`;
  try {
    const Result = await Conn.query(sql);
    return Result;
  } catch (error) {
    throw error;
  }
};

const FindOne = async (params) => {
  const sql = `SELECT * FROM usuarios WHERE id = $1`;
  try {
    const Result = await Conn.query(sql, [params]);

    return Result;
  } catch (error) {
    throw error;
  }
};

module.exports = { FindAllUser, FindOne };
