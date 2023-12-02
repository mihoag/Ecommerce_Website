const userM = require("../../models/users.m");

module.exports = {
  signIn: async (req, res) => {
    const user = await userM.getByEmail("haonhat2729@gmail.com");
    res.render("test", { layout: false, user: user[0] });
  },
  signUp: (req, res) => {
    res.render("");
  },
  renderHome: (req, res) => {
    res.render("user/home", { layout: "userLayout", title: "User Home" });
  },
};
