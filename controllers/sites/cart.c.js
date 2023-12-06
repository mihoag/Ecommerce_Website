class cartUserController {
    async showCart(req, res, next) {
        try {
            res.render('user/cart', { layout: false });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new cartUserController;
