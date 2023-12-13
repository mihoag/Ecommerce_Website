class statisticsController {
    async showStatistics(req, res, next) {
        try {
            res.render("admin/statistics", {
                layout: "adminLayout",
                title: "Statistics",
                isStatistics: true,
                css: "statistics"
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new statisticsController();