module.exports = {
  signIn: (req, res) => {
    res.render("");
  },
  signUp: (req, res) => {
    res.render("");
  },
  renderHome: (req, res) => {
    res.render("user/home", { layout: "userLayout", title: "User Home" });
  },
};
