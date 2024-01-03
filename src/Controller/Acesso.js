const Conn = require("../DB/conn");

const findAll = require("../Handler/Acesso/findAll");

class AcessoController {
  static async buscarTodos(req, res) {
    const x = await findAll();
    res.status(200).json({ data: x.rows });
  }
}

module.exports = AcessoController;
