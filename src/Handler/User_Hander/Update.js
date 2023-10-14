const Conn = require("../../DB/conn");

const Update = async (Payload) => {
  const sql = `UPDATE usuarios SET email = $1, senha = $2 WHERE id = $3 RETURNING *`;

  try {
    const Update = await Conn.query(sql, Payload);

    if (Update.rows[0]) {
      return Update.rows[0];
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = Update;
