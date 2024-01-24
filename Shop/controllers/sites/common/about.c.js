class aboutController {
    async showAbout(req, res, next) {
        try {
            res.render("common/about", { title: "Giới thiệu" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new aboutController();