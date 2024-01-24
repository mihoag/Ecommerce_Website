const express = require("express");
const router = express.Router();
const homeController = require("../../../controllers/sites/home.c");
const authMiddleware = require("../../../middlewares/auth.mws");

router.get("/", authMiddleware.dontLogin, homeController.signIn);


module.exports = router;
