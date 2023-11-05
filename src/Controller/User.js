const Conn = require("../DB/conn");
const User = require("../Handler/User");
const CreateTokenJWT = require("../Libs/Jwt");
const Crypt = require("../Libs/Crypt");

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
      const isUserExist = await User.FindUser.byEmail(email, method);

      if (isUserExist) {
        return res.status(400).json({ msg: `E-mail ${email} ja registrado` });
      }

      try {
        const createPasswordCrypt = await Crypt.Create(senha);
        const registeUserDB = await User.Register(email, createPasswordCrypt);

        if (registeUserDB) {
          return res
            .status(200)
            .json({ msg: "Usuario registrado com sucesso." });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ msg: "Error no servidor ao salvar o usuario" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error no servidor ao registrar os campos" });
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
      const userExist = await User.FindUser.byEmail(email, method);

      if (userExist) {
        try {
          const checkPassword = await Crypt.checkPasswordUser(
            senha,
            userExist.crypt
          );

          if (checkPassword) {
            const tokenJWT = CreateTokenJWT(userExist.id);
            res.status(200).json({ msg: "voce foi logado", token: tokenJWT });
          } else {
            res.status(400).json({ msg: "Senha errada" });
          }
        } catch (error) {
          console.log("Error no BCRYP", error);
          res.status(500).json({ error: "Error ao logar usuario." });
        }
      } else {
        res.status(400).json({ msg: `Email nao registrado` });
      }
    } catch (error) {
      console.log("Erro ao logar usuario", error);
      res.status(500).json({ msg: "Error no servidor ao buscar usuario" });
    }
  }

  static async Update_User(req, res) {
    const method = req.method;
    const idParams = req.params.id;
    const IdToken = req.dataToken.idUser;
    let { email, senha } = req.body;

    if (idParams != IdToken) {
      return res.status(401).json({ msg: "Nao autorizado atualizacao." });
    }

    if (!email && !senha) {
      return res
        .status(400)
        .json({ msg: "Senha ou Email tem de ser preenchido" });
    }

    if (email && senha) {
      try {
        const checkEmail = await User.FindUser.byEmail(email, method);

        if (checkEmail) {
          return res.status(400).json({ msg: "Email, ja registrado" });
        } else {
          const cryptNewSenha = await BcryptClass.Create_Hash(senha);
          const updateAll = await User.Update.UpdateEmailAndSenha(
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
      } catch (error) {
        return res.status(500).json({ msg: "Error ao alterar Email e Senha" });
      }
    }

    if (email && !senha) {
      try {
        const checkEmail = await User.FindUser.findOneUser(email, method);
        if (checkEmail) {
          return res.status(400).json({ msg: "Email, ja registrado" });
        } else {
          const updateEmailSucess = await User.Update.UpdateEmail(
            email,
            IdToken
          );
          if (updateEmailSucess) {
            res
              .status(200)
              .json({ msg: `Usuario ${email} alterado com sucesso!` });
          }
        }
      } catch (error) {
        return res.status(500).json({ msg: "Error ao alterar Email." });
      }
    }

    if (!email && senha) {
      try {
        const cryptNewSenha = await BcryptClass.Create_Hash(senha);
        const UpdateSenha = await User.Update.UpdateSenha(
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
      const DeleteHandler = await User.Remove([id]);
      if (DeleteHandler) {
        return res.status(200).json({ msg: "Usuario Deletado" });
      } else {
        return res.status(400).json({ msg: "Id invalido" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Error ao deletar usuario" });
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
