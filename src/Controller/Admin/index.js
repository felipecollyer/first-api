const { AdminHandler } = require("../../Handler");

class AdminController {
  static async buscarTodos(req, res) {
    const x = await AdminHandler.FindAllUser();
    if (x.rowCount == 0) {
      return res.status(200).json({ data: `Nenhum usuario registrado` });
    }
    return res.status(200).json({ data: x.rows });
  }

  static async buscarOne(req, res) {
    const { id } = req.params;

    const params = parseFloat(id);

    const x = await AdminHandler.FindOne(params);

    return res.status(200).json({ data: x.rows });
  }
}

module.exports = AdminController;
