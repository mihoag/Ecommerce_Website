function route(app) {
  // Admin side routes
  app.get("/admin/dashboard", (req, res) => {
    res.render("admin/dashboard", {
      layout: "adminLayout",
      title: "Admin Dashboard",
    });
  });
  app.get("/user/home", (req, res) => {
    res.render("user/home", { layout: "userLayout", title: "User Home" });
  });
  app.get("/", (req, res) => {
    res.render("common/index");
  });
  app.get("/news", (req, res) => {
    res.render("common/news");
  });
  app.get("/contact", (req, res) => {
    res.render("common/contact");
  });
  app.get("/hiring", (req, res) => {
    res.render("common/hiring");
  });
  app.get("/maintenance", (req, res) => {
    res.render("common/maintenance");
  });
  app.get("/about", (req, res) => {
    res.render("common/about");
  });

  app.use((req, res, next) => {
    res.render("error/404", { layout: false });
  });
}

module.exports = route;
