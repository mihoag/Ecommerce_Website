const userM = require("../models/users.m");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_PAYMENT;

async function createJWTfromEmail(email) {
  const token = jwt.sign({ email: email }, JWT_SECRET);
  return token;

}
module.exports = {
  mustLogin: async (req, res, next) => {
    try {
      if (req.session.passport) {
        req.session.uid = req.session.passport.user.userId
        req.session.email = req.session.passport.user.email

        req.session.token = await createJWTfromEmail(req.session.passport.user.email);
        //console.log(req.session.token)
      }
      if ((req.session.uid && req.session.email)) {
        userM.getByID(req.session.uid).then(async (user) => {
          //console.log(user);
          if (user.length <= 0) {
            return res.redirect("/auth/login");
          }
          if (user[0].email != req.session.email) {
            return res.redirect("/auth/login");
          } else {
            await userM.updateLastOnline(user[0].userId)
            next();
          }
        });
      } else return res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  },
  dontLogin: async (req, res, next) => {
    try {
      if (req.session?.uid && req.session?.email) {
        await userM.getByID(req.session.uid).then((user) => {
          if (user.length > 0 && user[0].email === req.session.email) {
            return res.redirect("/");
          } else next();
        });
      } else next();
    } catch (error) {
      next(error);
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      if (req.session.uid && req.session.email) {
        userM.getByID(req.session.uid).then((user) => {
          if (user.length < 0 || user[0].email != req.session.email) {
            return res.redirect("/auth/login");
          } else if (!user[0].role) {
            return res.redirect("/");
          } else next();
        });
      } else return res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  },
};
