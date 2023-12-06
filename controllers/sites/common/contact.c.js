class contactController {
    async showContact(req, res, next) {
        try {
            res.render("common/contact");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new contactController();