class newController {
    async showNews(req, res, next) {
        try {
            res.render("common/news", { title: "Tin tức" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new newController();