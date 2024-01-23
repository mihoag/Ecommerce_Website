const productM = require('../../../models/product.m')

class productsController {
  async showProducts(req, res, next) {
    try {

      res.render("admin/products", {
        layout: "adminLayout",
        title: "Products",
        isProducts: true,
        css: 'products',
        js: 'products'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new productsController();