const Conn = require("../../DB/conn");

const Update = async (PayloadUpdate) => {
  const email = PayloadUpdate[0];
  const senha = PayloadUpdate[1];
  const id = PayloadUpdate[2];

  if (email && senha) {
    const sql = `UPDATE usuarios SET email = $1, senha = $2 WHERE id = $3 RETURNING *`;

    try {
      const Update = await Conn.query(sql, [email, senha, id]);
      if (Update.rows[0]) {
        return Update.rows[0];
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  if (email && !senha) {
    const sql = `UPDATE usuarios SET email = $1, WHERE id = $3 RETURNING *`;
    try {
      const Update = await Conn.query(sql, email, id);

      if (Update.rows[0]) {
        return Update.rows[0];
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  } else {
    const sql = `UPDATE usuarios SET senha = $2, WHERE id = $3 RETURNING *`;

    try {
      const Update = await Conn.query(sql, senha, id);

      if (Update.rows[0]) {
        return Update.rows[0];
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Update;
