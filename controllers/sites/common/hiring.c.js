class hiringController {
    async showHiring(req, res, next) {
        try {
            res.render("common/hiring");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new hiringController();