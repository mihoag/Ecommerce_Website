const userM = require("../models/users.m");

module.exports = {
  mustLogin: async (req, res, next) => {
    try {
      if (req.session.passport) {
        req.session.uid = req.session.passport.user.userId
        req.session.email = req.session.passport.user.email
      }
      if ((req.session.uid && req.session.email)) {
        userM.getByID(req.session.uid).then(async (user) => {
          if (user.length < 0 || user[0].email != req.session.email) {
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
