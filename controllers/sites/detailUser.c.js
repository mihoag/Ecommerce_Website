class detailUserController {
    async showDetailUser(req, res, next) {
        try {
            res.render('user/detailUser', { layout: false });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new detailUserController;
