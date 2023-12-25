const productM = require('../../../models/product.m')
class showallController {
    async showall(req, res, next) {
        try {
            res.render("common/allProduct", { showall: true });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new showallController();