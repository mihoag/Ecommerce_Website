const express = require("express");
const router = express.Router();

const controller = require("../../controllers/sites/product.c");
const authMiddleware = require("../../middlewares/auth.mws");

router.get("/signin", homeController.signIn);
router.get("/signup", homeController.signUp);
router.get("/", homeController.renderHome);

module.exports = router;
