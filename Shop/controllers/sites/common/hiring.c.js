class hiringController {
    async showHiring(req, res, next) {
        try {
            res.render("common/hiring", { title: "Tuyển dụng" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new hiringController();