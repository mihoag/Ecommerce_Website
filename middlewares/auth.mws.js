const userM = require("../models/users.m");

module.exports = {
  mustLogin: async (req, res, next) => {
    try {
      if (req.session.uid && req.session.email) {
        userM.getByID(req.session.uid).then((user) => {
          if (user.length < 0 || user[0].email != req.session.email) {
            return res.redirect("/login");
          } else next();
        });
      } else return res.redirect("/login");
    } catch (error) {
      next(error);
    }
  },
  dontLogin: async (req, res, next) => {
    try {
      if (req.session?.uid && req.session?.username) {
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
};
