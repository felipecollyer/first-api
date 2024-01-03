const Conn = require("../../DB/conn");

const findAll = async () => {
  const sql = `SELECT * FROM usuarios`;
  try {
    const Result = await Conn.query(sql);
    return Result;
  } catch (error) {
    throw error;
  }
};
module.exports = findAll;
