const userM = require("../../models/users.m");
class detailUserController {
  async showDetailUser(req, res, next) {
    try {

      const user = (await userM.getByID(req.session.uid))[0];
      res.render("user/detailUser", { layout: false, user });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new detailUserController();
