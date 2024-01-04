const { Router } = require("express");

const router = Router();

const CadastroRouter = require("./Cadastro");
const AdminRouter = require("./Admin");
const TestRouter = require("./Testes");

router.use("/cadastro", CadastroRouter);
router.use("/teste", TestRouter);
router.use("/admin", AdminRouter);

module.exports = router;
