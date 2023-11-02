const Conn = require("../DB/conn");
const User_Hander = require("../Handler/User_Hander");
const CreateToken = require("../Jwt");
const { BcryptClass } = require("../Libs/Bcrypt");
const { Verify_Token } = require("../Middlewares");

class UserController {
  static async Create_User(req, res) {
    const method = req.method;
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ msg: "Campos obrigatórios não preenchidos" });
    }
    try {
      const isUserExist = await User_Hander.FindUser.findOneUser(email, method);
      if (isUserExist) {
        return res
          .status(400)
          .json({ msg: `E-mail ${isUserExist.email} ja registrado` });
      }

      const hashedPassword = await BcryptClass.Create_Hash(senha);

      const createUser = [email, hashedPassword];
      try {
        const registerSucess = await User_Hander.Register(createUser);
        if (registerSucess) {
          return res
            .status(200)
            .json({ msg: "Usuario registrado com sucesso." });
        }
      } catch (error) {
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
    const method = req.method;
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ msg: "Campos obrigatórios não preenchidos" });
    }

    try {
      const UserExist = await User_Hander.FindUser.findOneUser(email, method);

      if (UserExist) {
        try {
          const ValidHash = await BcryptClass.Read_Hash(senha, UserExist.crypt);

          if (ValidHash) {
            const token = CreateToken(UserExist.id);
            res.status(200).json({ msg: "voce foi logado", token: token });
          } else {
            res.status(400).json({ msg: "Senha errada" });
          }
        } catch (error) {
          console.log("Error no BCRYP", error);
          res.status(500).json({ error: "Error no servidor" });
        }
      } else {
        res.status(400).json({ msg: `Email nao registrado` });
      }
    } catch (error) {
      console.log("Erro ao logar usuario", error);
      res.status(500).json({ msg: "Error no servidor" });
    }
  }

  static async Update_User(req, res) {
    const method = req.method;
    const idParams = req.params.id;
    const IdToken = req.dataToken.idUser;
    let { email, senha } = req.body;

    if (idParams != IdToken) {
      return res.status(400).json({ msg: "Token invalido" });
    }

    if (!email && !senha) {
      return res.status(400).json({ msg: "Error, senha e email em branco" });
    }

    if (email && senha) {
      const checkEmail = await User_Hander.FindUser.findOneUser(email, method);

      if (checkEmail) {
        return res.status(400).json({ msg: "Email, ja registrado" });
      } else {
        const cryptNewSenha = await BcryptClass.Create_Hash(senha);

        const updateAll = await User_Hander.Update.UpdateEmailAndSenha(
          email,
          cryptNewSenha,
          IdToken
        );
        if (updateAll) {
          res
            .status(200)
            .json({ msg: `Usuario ${email} e senha alterado com sucesso!` });
        }
      }
    }

    if (email && !senha) {
      const checkEmail = await User_Hander.FindUser.findOneUser(email, method);

      if (checkEmail) {
        return res.status(400).json({ msg: "Email, ja registrado" });
      } else {
        const updateEmailSucess = await User_Hander.Update.UpdateEmail(
          email,
          IdToken
        );
        if (updateEmailSucess) {
          res
            .status(200)
            .json({ msg: `Usuario ${email} alterado com sucesso!` });
        }
      }
    }

    if (!email && senha) {
      const cryptNewSenha = await BcryptClass.Create_Hash(senha);

      try {
        const UpdateSenha = await User_Hander.Update.UpdateSenha(
          cryptNewSenha,
          IdToken
        );

        res.status(201).json({ msg: `Senha alterada com sucesso!` });
      } catch (error) {
        return res
          .status(500)
          .json({ msg: "Error ao alterar senha de usuario" });
      }
    }
  }

  static async DeleteUser(req, res) {
    const { id } = req.params;
    const { idUser } = req.dataToken;

    if (idUser != id) {
      return res.status(400).json({ msg: "Nao autorizado!" });
    }

    try {
      const DeleteHandler = await User_Hander.Remove([id]);

      if (DeleteHandler) {
        return res.status(200).json({ msg: "Usuario Deletado" });
      } else {
        return res.status(400).json({ msg: "Id invalido" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Error no servidor", error: error });
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
