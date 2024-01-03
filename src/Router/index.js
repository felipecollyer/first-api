const { Router } = require("express");

const router = Router();
const UserRouter = require("./User");
const AcessoRouter = require("./Acesso");
const TestRouter = require("./Test");

router.use("/cadastro", UserRouter);
router.use("/teste", TestRouter);
router.use("/acesso", AcessoRouter);

module.exports = router;
