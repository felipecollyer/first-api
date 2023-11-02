const Conn = require("../../DB/conn");

const UpdateEmailAndSenha = async (email, senha, id) => {
  const sql = `UPDATE usuarios SET email = $1, senha = $2 WHERE id = $3 RETURNING *`;

  try {
    const Update = await Conn.query(sql, [email, senha, id]);

    if (Update.rows) {
      const { email } = Update.rows[0];
      return email;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const UpdateEmail = async (email, id) => {
  console.log(email, id);

  const sql = `UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING *`;
  try {
    const Update = await Conn.query(sql, [email, id]);
    if (Update.rows[0]) {
      const { email } = Update.rows[0];
      return email;
    }
  } catch (error) {
    throw error;
  }
};

const UpdateSenha = async (senha, id) => {
  const sql = `UPDATE usuarios SET senha = $1 WHERE id = $2 RETURNING *`;

  try {
    const Update = await Conn.query(sql, [senha, id]);

    if (Update.rows[0]) {
      return Update.rows[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { UpdateEmailAndSenha, UpdateEmail, UpdateSenha };
