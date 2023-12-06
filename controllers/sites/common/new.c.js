class newController {
    async showNews(req, res, next) {
        try {
            res.render("common/maintenance");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new newController();