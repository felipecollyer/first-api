const Conn = require("../DB/conn");
const CreateTokenJWT = require("../Handler");
const Bcrypt = require("bcrypt");
//const CreateToken = require("../Middlewares/CreateTokenJWT");
const saltRounds = 10;
const If_Exist_User = require("../Handler/If_Exist_User");
const User_Hander = require("../Handler/User_Hander");
const CreateToken = require("../Jwt");

class UserController {
  static async Create_User(req, res) {
    const { email, senha } = req.body;

    if (email && senha) {
      const UserExist = await If_Exist_User(email);

      if (!UserExist) {
        const hashPassword = Bcrypt.hashSync(senha, saltRounds);
        const InputValue = [email, hashPassword];

        try {
          const RegisterSucess = await User_Hander.Register(InputValue);
          if (RegisterSucess) {
            res.status(200).json({ msg: "Usuario registrado com sucesso" });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ msg: "Error no servidor" });
        }
      } else {
        res.status(400).json({ msg: "Email ja registrado" });
      }
    }
  }

  static async Read_User(req, res) {
    const { email, senha } = req.body;
    const ResultUser = await User_Hander.Read(email);

    if (ResultUser) {
      const ValidHash = Bcrypt.compareSync(senha, ResultUser.senha);
      const token = CreateToken(ResultUser.id);

      if (ValidHash) {
        res.status(200).json({ msg: "voce foi logado", token: token });
      } else {
        res.status(400).json({ msg: "Senha errada" });
      }
    }
  }

  static async Update_User(req, res) {
    const { id } = req.params;
    const { email, senha } = req.body;

    try {
      const Update = await User_Hander.Update([email, senha, id]);
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
    const sql = `SELECT * FROM usuarios`;

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
