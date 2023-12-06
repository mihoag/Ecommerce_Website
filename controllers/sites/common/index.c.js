class indexController {
    async showIndex(req, res, next) {
        try {
            res.render("common/index");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new indexController();