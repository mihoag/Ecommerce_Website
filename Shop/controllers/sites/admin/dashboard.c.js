class dashboardController {
  async showDashboard(req, res, next) {
    try {
      res.render("admin/dashboard", {
        layout: "adminLayout",
        title: "Admin Dashboard",
        isDashboard: true,
        css: "dashboard",
        js: "dashboard",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new dashboardController();
