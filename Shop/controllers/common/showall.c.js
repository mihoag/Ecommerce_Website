const productM = require('../../models/product.m')
const productL = require('../../models/productsList.m')

class showallController {
    async showall(req, res, next) {
        try {
            let listproducts = await productL.getAll();
            res.render("common/allProduct", { showall: true, title: "Thế giới điện thoại", listproducts: listproducts });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new showallController();