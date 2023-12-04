const userM = require("../models/users.m");

module.exports = {
  mustLogin: async (req, res, next) => {
    try {
      if (req.session.uid && req.session.email) {
        userM.getByID(req.session.uid).then((user) => {
          if (user.length < 0 || user[0].email != req.session.email) {
            return res.redirect("/signin");
          } else next();
        });
      } else return res.redirect("/signin");
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
            return res.redirect("/signin");
          } else if (!user[0].role) {
            return res.redirect("/");
          } else next();
        });
      } else return res.redirect("/signin");
    } catch (error) {
      next(error);
    }
  },
};
