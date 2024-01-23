class newController {
    async showNews(req, res, next) {
        try {
            res.render("common/news");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new newController();