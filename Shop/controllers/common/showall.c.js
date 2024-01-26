const productM = require('../../models/product.m')
const productL = require('../../models/productsList.m')

class showallController {
    async showall(req, res, next) {
        try {
            let listproducts = await productL.getAll();
            // Chuyển tên của sản phẩm thành viết hoa chữ cái đầu
            listproducts = listproducts.map(product => {
                // Chuyển đổi tên thành viết thường trừ chữ cái đầu
                const lowercaseProductName = product.name.charAt(0) + product.name.slice(1).toLowerCase();
                // Trả về sản phẩm mới với tên đã được chuyển đổi
                return { ...product, name: lowercaseProductName };
            });

            res.render("common/allProduct", { showall: true, title: "Thế giới điện thoại", listproducts: listproducts });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new showallController();