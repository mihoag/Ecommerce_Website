const userM = require("../../models/users.m");

module.exports = {
  signIn: async (req, res) => {
    //const user = await userM.getByEmail("haonhat2729@gmail.com");
    res.render("common/login", { layout: false });
  },
  signUp: (req, res) => {
    res.render("common/signup", { layout: false });
  },
  renderHome: (req, res) => {
    // console.log(req.session.token)
    res.render("", { layout: "userLayout", title: "User Home" });
  },
};
