const { Router } = require("express");

const router = Router();
const UserRouter = require("./User");
const TestRouter = require("./Test");

router.use("/cadastro", UserRouter);
router.use("/teste", TestRouter);

module.exports = router;
