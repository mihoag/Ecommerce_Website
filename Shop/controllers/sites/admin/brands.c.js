class brandsController {
    async showBrands(req, res, next) {
        try {
            res.render("admin/brands", {
                layout: "adminLayout",
                title: "Brands",
                isBrands: true,
                css: 'brands',
                js: 'brands'
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new brandsController();