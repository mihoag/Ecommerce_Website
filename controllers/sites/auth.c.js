const userM = require("../../models/users.m");
const CryptoJS = require("crypto-js");
const hashLength = 64;

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
          //TODO: show error message
        } else {
          // check password
          const pwDb = rs[0].password;
          const salt = pwDb.slice(hashLength);
          const pwSalt = user.password + salt;
          const pwHashed = CryptoJS.SHA3(pwSalt, {
            outputLength: hashLength * 4,
          }).toString(CryptoJS.enc.Hex);
          if (pwDb !== pwHashed + salt)
            //TODO: show error message

            // all good
            req.session.uid = rs[0].ID;
          req.session.email = rs[0].email;
          return res.redirect("/");
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
      userM.getByEmail(newUser.email).then((rs) => {
        if (rs.length === 0) {
          // don't have user with email
          const salt = Date.now().toString(16);
          const pwSalt = newUser.password + salt;
          const pwHashed = CryptoJS.SHA3(pwSalt, {
            outputLength: hashLength * 4,
          }).toString(CryptoJS.enc.Hex);
          newUser.password = pwHashed + salt;

          // new user
          userM.add(newUser);
          // TODO: render success page
        } else {
          newUser.password = pw;

          // TODO: re-render register page with error
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
