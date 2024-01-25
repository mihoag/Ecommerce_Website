const productM = require('../../models/product.m');
const typeM = require('../../models/type.m');

class brandsController {
    async showBrands(req, res, next) {
        try {
            let brands = await typeM.getAll();
            let top5s = [];
            for (let i = 0; i < brands.length; i++) {
                let data = {};
                data = brands[i];
                data.top5 = await typeM.getTop5OfBrand(brands[i].typeId);
                top5s.push(data);
            }

            res.render("admin/brands", {
                data: {
                    brands,
                    top5s
                },
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
    async getDataTypeById(req, res, next) {
        try {
            const dataType = await productM.getDataTypeById(req.params.typeId);
            return res.json(dataType);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new brandsController();