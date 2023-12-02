const userM = require("../../models/users.m");
const CryptoJS = require("crypto-js");
const hashLength = 64;
const sendMail = require("../../utils/sendEmail.u");
const tokenM = require("../../models/token.m");
const jwt = require("jsonwebtoken");

module.exports = {
  render: async (req, res, next) => {
    try {
      return res.render("");
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
          res.json({ message: "Email or password incorrect" });
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
          }

          // all good
          req.session.uid = rs[0].userId;
          req.session.email = rs[0].email;

          res.json({ message: "Login successful" });
          // TODO: redirect to home page
          // return res.redirect("/");
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
      res.redirect("/");
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
          newUser.avatar = `https://robohash.org/${newUser.email}.png?set=set4`;

          // new user
          userM.add(newUser);
          // send mail
          await sendMail.sendMail(newUser.email);

          // TODO: render success page
          return res.json({ message: "User created successfully" });
        } else {
          newUser.password = pw;

          // TODO: re-render register page with error
          return res.json({ message: "Email is existing" });
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
};
