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
    async addNewBrand(req, res, next) {
        try {
            if (!req.body || !req.body.brand) {
                return res.status(401).json({ message: "Thông tin không hợp lệ" });
            }
            await typeM.add({ name: req.body.brand });
            res.json({ message: 'Thêm brand mới thành công' });
        } catch (error) {
            next(error);
        }
    }
    async editBrand(req, res, next) {
        try {
            if (!req.body) {
                return res.status(401).json({ message: 'Dữ liệu cập nhật không hợp lệ' });
            }
            await typeM.update(req.body);
            return res.json({ message: 'Cập nhật thông tin thành công' });
        } catch (error) {
            next(error);
        }
    }
    async deleteBrand(req, res, next) {
        try {
            const rs = await typeM.delete(req.params.typeId);
            if (rs === -1) {
                return res.status(401).json({ message: 'Không thể xóa do hiện có sản phẩm trong brand này' });
            }
            return res.json({ message: 'Đã xóa brand thành công' });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new brandsController();