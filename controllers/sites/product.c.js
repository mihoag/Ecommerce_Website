const productM = require("../../models/product.m");
const typeM = require("../../models/product.m");
const my_cloudinary = require("../../configs/myCloudinary");

module.exports = {
  renderPage: async (req, res, next) => {
    try {
      res.render("test/test_product", { layout: false });
    } catch (error) {
      next(error);
    }
  },
  renderPageUpdate: async (req, res, next) => {
    try {
      const haveProduct = await productM.getByID(req.params?.id);
      // check if product don't already exist
      if (haveProduct.length <= 0) {
        return res.status(400).json({ message: "Product ID invalid" });
      }
      res.render("test/test_product_update", {
        layout: false,
        product: haveProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const rs = await productM.getAll();
      // TODO: delete this later
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.json({ message: "Please choose image file" });
      }
      const newProduct = req.body;

      const { url, public_id } = await my_cloudinary.push(req.file.path);
      newProduct.image = url;
      newProduct.public_id = public_id;

      const rs = await productM.add(newProduct);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const updateProduct = req.body;
      updateProduct.productId = req.params?.id;
      const haveProduct = await productM.getByID(updateProduct.productId);
      // check if product don't already exist
      if (haveProduct.length <= 0) {
        return res.status(400).json({ message: "Product ID invalid" });
      }

      // check if product image dont have
      if (req.file) {
        const { url, public_id } = await my_cloudinary.push(req.file.path);
        if (haveProduct.public_id) {
          await my_cloudinary.destroy(haveProduct.public_id);
        }
        updateProduct.image = url;
        updateProduct.public_id = public_id;
      } else {
        updateProduct.image = haveProduct.image;
        updateProduct.public_id = haveProduct.public_id;
      }

      const rs = await productM.update(updateProduct);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const haveProduct = await productM.getByID(req.params?.id);
      // check if product don't already exist
      if (haveProduct.length <= 0) {
        return res.status(400).json({ message: "Product ID invalid" });
      }

      await my_cloudinary.destroy(haveProduct.public_id);
      const rs = await productM.delete(req.params?.id);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
};
