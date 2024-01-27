const express = require("express");
const router = express.Router();
const controller = require("../../controllers/sites/auth.c");
const authMiddleware = require("../../middlewares/auth.mws");
const upload = require("../../utils/parseFile");
const passport = require("passport");

router.get("/success", authMiddleware.dontLogin, controller.renderSuccess);
router.get("/signup", authMiddleware.dontLogin, controller.renderSignUp);
router.get("/login", authMiddleware.dontLogin, controller.renderSignIn);
router.get(
  "/forgotPassword",
  authMiddleware.dontLogin,
  controller.forgotPassword
);
router.post(
  "/forgotPassword",
  authMiddleware.dontLogin,
  controller.handleForgotPassword
);
//auth/federated/google, auth/oauth2/redirect/google
// login with google
router.get("/federated/google", passport.authenticate("google"));
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true
  }),
  function (req, res) {
    let redirectTo = '/';
    if (req.session?.passport?.user?.role == 'admin') {
      redirectTo = '/admin';
    }
    res.redirect(redirectTo);
  }
);

router.post("/signup", authMiddleware.dontLogin, controller.signup);
router.post("/login", authMiddleware.dontLogin, controller.signIn);
router.post("/logout", authMiddleware.mustLogin, controller.signOut);
router.get("/verify/:token", controller.verifyAccount);
router.post(
  "/edit",
  authMiddleware.mustLogin,
  upload.single("image"),
  controller.edit
);


router.post("/change", upload.single(), controller.change);

router.post("/delete/:id", authMiddleware.isAdmin, controller.delete);

module.exports = router;
