class settingsController {
    async showSettings(req, res, next) {
        try {
            res.render("admin/settings", {
                layout: "adminLayout",
                title: "Settings",
                isSettings: true,
                css: "settings"
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new settingsController();