const Product = require("../../models/product.m");
const ProductDetail = require("../../models/productDetail.m");
const my_cloudinary = require("../../configs/myCloudinary");

class productsController {
  async showProducts(req, res, next) {
    try {
      res.render("admin/products", {
        layout: "adminLayout",
        title: "Products",
        isProducts: true,
        css: "products",
        js: "products",
      });
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req, res, next) {
    try {
      if (!req.file) {
        return res.status(406).json("Vui lòng chọn ảnh minh họa");
      }
      const { url, public_id } = await my_cloudinary.push(req.file.path);
      const item = req.body;
      item.image = url;
      item.public_id = public_id;
      const result = await Product.add(item);
      item.productId = result.productId;
      const result2 = await ProductDetail.add(item);
      if (result && result2) {
        res.status(200).json("Thêm sản phẩm thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const result = await Product.getByID(req.query.id_item);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const item = req.body;
      if (req.file) {
        const { url, public_id } = await my_cloudinary.push(req.file.path);
        item.image = url;
        item.public_id = public_id;
      } else {
        item.image = item.oldimage;
      }
      const result = await Product.update(item);
      item.productId = result.productId;
      const result2 = await ProductDetail.update(item);
      if (result && result2) {
        res.status(200).json("Cập nhập sản phẩm thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }

  async deactivateProduct(req, res, next) {
    try {
      const result = await Product.updateActiveProduct(req.body.productId);
      if (result) {
        res.status(200).json("Vô hiệu sản phẩm thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new productsController();
