const userM = require("../../models/users.m");
const CryptoJS = require("crypto-js");
const hashLength = 64;
const sendMail = require("../../utils/sendEmail.u");
const tokenM = require("../../models/token.m");
const forgotCodeM = require("../../models/forgotCode.m");
const jwt = require("jsonwebtoken");
const my_cloudinary = require("../../configs/myCloudinary");
const randomCode = require("../../utils/randomCode");

module.exports = {
  renderSuccess: async (req, res, next) => {
    try {
      res.render("common/success", { layout: false });
    } catch (error) {
      next(error);
    }
  },
  renderSignIn: async (req, res, next) => {
    try {
      res.render("common/login", { layout: false });
    } catch (error) {
      next(error);
    }
  },
  renderSignUp: async (req, res, next) => {
    try {
      res.render("common/signup", { layout: false });
    } catch (error) {
      next(error);
    }
  },
  render: async (req, res, next) => {
    try {
      return res.render("test");
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const user = req.body;
      userM.getByEmail(user.email).then((rs) => {
        if (rs.length === 0) {
          // check username
          res.render("common/login", {
            layout: false,
            message: "Username or password is incorrect",
            user,
          });
          //TODO: show error message
        } else {
          // check password
          const pwDb = rs[0].password;
          const salt = pwDb.slice(hashLength);
          const pwSalt = user.password + salt;
          const pwHashed = CryptoJS.SHA3(pwSalt, {
            outputLength: hashLength * 4,
          }).toString(CryptoJS.enc.Hex);
          if (pwDb !== pwHashed + salt) {
            //TODO: show error message
            return res.render("common/login", {
              layout: false,
              message: "Username or password is incorrect",
              user,
            });
          }

          // check account is valid
          if (rs[0].active == false) {
            //TODO: show error message
            return res.render("common/login", {
              layout: false,
              message: "Your account is not active",
              user,
            });
          }

          // all good
          req.session.uid = rs[0].userId;
          req.session.email = rs[0].email;

          // TODO: redirect to home page
          return res.redirect("/");
          // return res.json({ message: "Login successful" });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  signOut: async (req, res, next) => {
    try {
      req.session.uid = null;
      req.session.email = null;
      // TODO: redirect to login page
      res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      let newUser = req.body;
      const pw = newUser.password;
      userM.getByEmail(newUser.email).then(async (rs) => {
        if (rs.length === 0) {
          // don't have user with email
          const salt = Date.now().toString(16);
          const pwSalt = newUser.password + salt;
          const pwHashed = CryptoJS.SHA3(pwSalt, {
            outputLength: hashLength * 4,
          }).toString(CryptoJS.enc.Hex);
          newUser.password = pwHashed + salt;
          newUser.avatar = `https://ui-avatars.com/api/?name=No+Name`;
          newUser.public_id = null;

          // new user
          userM.add(newUser);
          // send mail
          await sendMail.sendMail(newUser.email);

          // TODO: render success page
          return res.redirect("/auth/success");
        } else {
          newUser.password = pw;

          // TODO: re-render register page with error
          return res.render("common/signup", {
            layout: false,
            message: "Email is existing",
            user: newUser,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  verifyAccount: async (req, res, next) => {
    try {
      const { token } = req.params;
      const rs = await tokenM.getToken(token);
      if (rs.length === 0) {
        throw new Error("Invalid Token");
      } else {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        const haveAcc = await userM.getByEmail(user.email);
        if (haveAcc.length === 0) {
          throw new Error("Invalid Email");
        } else {
          await userM.updateActiveAccount(haveAcc[0].userId);
          await tokenM.delete(rs[0].codeId);
          // req.session.uid = haveAcc[0].userId;
          // req.session.email = haveAcc[0].email;
          res.send("Verified email");
        }
      }
    } catch (error) {
      next(error);
    }
  },
  change: async (req, res, next) => {
    try {
      const { password, newPassword } = req.body;
      userM.getByEmail(req.session.email).then(async (rs) => {
        if (rs.length === 0) {
          // check username
          res.redirect("/auth/login");
        } else {
          // check current password
          if (rs[0].password.length > 0) {
            const pwDb = rs[0].password;
            const salt = pwDb.slice(hashLength);
            const pwSalt = password + salt;
            const pwHashed = CryptoJS.SHA3(pwSalt, {
              outputLength: hashLength * 4,
            }).toString(CryptoJS.enc.Hex);
            if (pwDb !== pwHashed + salt) {
              return res.json({
                success: false,
                message: "Password hiện tại không khớp",
              });
            }
          }

          // change password
          const salt2 = Date.now().toString(16);
          const pwSalt2 = newPassword + salt2;
          const pwHashed2 = CryptoJS.SHA3(pwSalt2, {
            outputLength: hashLength * 4,
          }).toString(CryptoJS.enc.Hex);
          await userM.changePass(req.session.uid, pwHashed2 + salt2);

          return res.json({
            success: true,
            message: "Cập nhật password thành công",
          });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  edit: async (req, res, next) => {
    try {
      const user = (await userM.getByEmail(req.session.email))[0];
      const { name, phoneNumber } = req.body;
      user.name = name;
      user.phoneNumber = phoneNumber;
      if (req.file?.path) {
        if (user.public_id) {
          await my_cloudinary.destroy(user.public_id);
        }
        try {
          const { url, public_id } = await my_cloudinary.push(req.file.path);
          user.avatar = url;
          user.public_id = public_id;
        } catch (error) {
          next(error);
        }
      }
      await userM.update(user);
      return res.json({ succes: true, message: "Updated user successfully" });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const haveUser = await userM.getByID(req.params?.id);
      // check if product don't already exist
      if (haveUser.length <= 0) {
        return res.status(400).json({ message: "User ID invalid" });
      }

      await my_cloudinary.destroy(haveUser[0].public_id);
      const rs = await userM.delete(req.params?.id);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      res.render("common/forgotPassword", { layout: false, show: false });
    } catch (error) {
      next(error);
    }
  },
  handleForgotPassword: async (req, res, next) => {
    try {
      if (req.body?.email && !req.body?.code) {
        const { email } = req.body;
        const rs = await userM.getByEmail(email);
        if (rs.length > 0) {
          await forgotCodeM.delete(rs[0].userId);
          const code = randomCode();
          await forgotCodeM.add(code, rs[0].userId);

          // send mail
          await sendMail.sendCode(rs[0].email, code);
        }
        res.render("common/forgotPassword", {
          layout: false,
          show: true,
          email,
        });
      } else {
        const { code, password, email } = req.body;
        const rs = await forgotCodeM.getToken(code);
        if (rs.length > 0) {
          // change password

          const salt = Date.now().toString(16);
          const pwSalt = password + salt;
          const pwHashed = CryptoJS.SHA3(pwSalt, {
            outputLength: hashLength * 4,
          }).toString(CryptoJS.enc.Hex);
          await userM.changePass(rs[0].userId, pwHashed + salt);
          await forgotCodeM.delete(rs[0].userId);
          return res.render("common/forgotPassword", {
            layout: false,
            show: true,
            email,
            code,
            password,
            toast: true,
          });
        }
        res.render("common/forgotPassword", {
          layout: false,
          show: true,
          email,
          code,
          password,
          message: "Invalid code, please check your mail",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
