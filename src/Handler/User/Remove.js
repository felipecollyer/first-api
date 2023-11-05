const Conn = require("../../DB/conn");

const Remove = async (id) => {
  const sql = `DELETE FROM usuarios WHERE id = $1`;
  try {
    const DeleteUser = await Conn.query(sql, id);

    return DeleteUser.rowCount;
  } catch (error) {
    throw error;
  }
};

module.exports = Remove;
