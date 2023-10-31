const Conn = require("../DB/conn");
const User_Hander = require("../Handler/User_Hander");
const CreateToken = require("../Jwt");
const { BcryptClass } = require("../Libs/Bcrypt");
const { Verify_Token } = require("../Middlewares");

class UserController {
  static async Create_User(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ msg: "Campos obrigatórios não preenchidos" });
    }
    try {
      const isUserExist = await User_Hander.FindUser(email);
      if (isUserExist) {
        return res
          .status(400)
          .json({ msg: `E-mail ${isUserExist.email} ja registrado` });
      }

      const hashedPassword = await BcryptClass.Create_Hash(senha);

      const InputValue = [email, hashedPassword];
      try {
        const registerSucess = await User_Hander.Register(InputValue);
        if (registerSucess) {
          return res
            .status(200)
            .json({ msg: "Usuario registrado com sucesso." });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ msg: "Error no servidor ao registrar o usuario" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error em validar os campos" });
    }
  }

  static async Read_User(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ msg: "Campos obrigatórios não preenchidos" });
    }

    try {
      const ResultUser = await User_Hander.FindUser(email);
      if (ResultUser) {
        try {
          const ValidHash = await BcryptClass.Read_Hash(
            senha,
            ResultUser.crypt
          );
          console.log(ResultUser);
          if (ValidHash) {
            const token = CreateToken(ResultUser.id);
            res.status(200).json({ msg: "voce foi logado", token: token });
          } else {
            res.status(400).json({ msg: "Senha errada" });
          }
        } catch (error) {
          res.status(500).json({ error: "Error no servidor" });
        }
      } else {
        res.status(400).json({ msg: `Email nao registrado` });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error no servidor" });
    }
  }

  static async Update_User(req, res) {
    const idParams = req.params.id;
    const { email, senha } = req.body;
    const idUser = req.user.data;

    if (idUser.toString() != idParams) {
      return res
        .status(400)
        .json({ msg: "Error em ao enviar paramentro ID incorreto" });
    }

    if (!email && !senha) {
      return res.status(400).json({ msg: "Error, senha e email em branco" });
    }

    try {
      const Update = await User_Hander.Update([email, senha, idUser]);
      if (Update) {
        res
          .status(200)
          .json({ msg: `Usuario ${Update.email} alterado com sucesso!` });
      } else {
        res.status(400).json({ msg: "Id invalido" });
      }
    } catch (error) {
      throw error;
    }
  }

  static async DeleteUser(req, res) {
    const { id } = req.params;

    try {
      const DeleteHandler = await User_Hander.Remove([id]);

      if (DeleteHandler) {
        res.status(200).json({ msg: "Usuario Deletado" });
      } else {
        res.status(400).json({ msg: "Id invalido" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error no servidor", error: error });
    }
  }

  static async all_User_test(req, res) {
    const sql = `SELECT * FROM usuarios ORDER BY id`;

    try {
      const Result = await Conn.query(sql);
      res.json({ Usuarios: Result.rows });
      return;
    } catch (error) {
      throw error;
    }
  }

  static authorization(req, res) {
    res.status(200).json({ msg: "Token valido", user: req.user });
  }

  static ReadAllUser(req, res) {
    const sql = "SELECT * FROM usuarios";

    Conn.query(sql, (err, data) => {
      if (err) {
        console.log("errow");
      } else {
        res.send(data.rows);
      }
    });
  }
}

module.exports = UserController;
