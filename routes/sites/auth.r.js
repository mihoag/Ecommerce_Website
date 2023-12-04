const express = require("express");
const router = express.Router();
const controller = require("../../controllers/sites/auth.c");
const authMiddleware = require("../../middlewares/auth.mws");
const upload = require("../../utils/parseFile");

router.post("/signup", authMiddleware.dontLogin, controller.signup);
router.post("/signin", authMiddleware.dontLogin, controller.signIn);
router.post("/signout", authMiddleware.mustLogin, controller.signOut);
router.get("/verify/:token", controller.verifyAccount);
router.post(
  "/edit",
  authMiddleware.mustLogin,
  upload.single("image"),
  controller.edit
);
router.post("/delete/:id", authMiddleware.isAdmin, controller.delete);

module.exports = router;
