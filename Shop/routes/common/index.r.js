const express = require("express");
const router = express.Router();
const indexController = require("../../controllers/common/index.c");
const authMiddleware = require("../../middlewares/auth.mws");

router.get("/", authMiddleware.mustLogin, indexController.showIndex);
module.exports = router;
