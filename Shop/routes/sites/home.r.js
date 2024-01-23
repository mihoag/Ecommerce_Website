const express = require("express");
const router = express.Router();

const homeController = require("../../controllers/sites/home.c");
const authMiddleware = require("../../middlewares/auth.mws");

router.use(authMiddleware.dontLogin);

// router.get("/signin", homeController.signIn);
// router.get("/signup", homeController.signUp);
router.get("/", homeController.renderHome);

module.exports = router;
