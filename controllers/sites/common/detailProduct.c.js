class detailProductController {
    async showDetailProduct(req, res, next) {
        try {
            res.render("common/detailProduct");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new detailProductController();