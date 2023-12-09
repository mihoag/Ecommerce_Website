const express = require("express");
const router = express.Router();

const userdetailController = require("../../controllers/sites/detailUser.c");
const authMiddleware = require("../../middlewares/auth.mws");

router.get("/", authMiddleware.mustLogin, userdetailController.showDetailUser);

module.exports = router;
