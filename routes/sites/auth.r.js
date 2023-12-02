const express = require("express");
const router = express.Router();
const controller = require("../../controllers/sites/auth.c");
const authMiddleware = require("../../middlewares/auth.mws");

router.post("/signup", authMiddleware.dontLogin, controller.signup);
router.post("/signin", authMiddleware.dontLogin, controller.signIn);
router.post("/signout", authMiddleware.mustLogin, controller.signOut);

module.exports = router;
