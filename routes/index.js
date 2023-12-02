function route(app) {
  // Admin side routes
  app.get("/admin/dashboard", (req, res) => {
    res.render("admin/dashboard", {
      layout: "adminLayout",
      title: "Admin Dashboard",
    });
  });

  // user routes
  app.use("/user", require("./sites/home.r"));
  app.use("/auth", require("./sites/auth.r"));

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
