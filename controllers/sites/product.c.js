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

  getProductPerPage: async (req, res, next) => {
    try {
      let data = await productM.getAll();
      // console.log(data)
      let result = [];
      const per_page = 10;
      let totalPage = parseInt(parseInt(data.length) / parseInt(per_page));
      if (data.length % per_page != 0) {
        totalPage++;
      }

      let currentPage = req.query.currentPage;
      if (currentPage === undefined) {
        currentPage = 1;
      }
      let start = (currentPage - 1) * per_page;
      for (let i = start; i < start + per_page; i++) {
        if (i >= data.length) {
          break;
        }
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({ listproduct: result, totalPage: totalPage, currentPage: currentPage });
    } catch (error) {
      next(error);
    }
  },
  getSearchProductPerPage: async (req, res, next) => {
    try {
      let keyword = req.query.keyword;
      let data = await productM.selectProductByNameandCate(keyword);
      // console.log(data)
      let result = [];
      const per_page = 10;
      let totalPage = parseInt(parseInt(data.length) / parseInt(per_page));
      if (data.length % per_page != 0) {
        totalPage++;
      }

      let currentPage = req.query.currentPage;
      if (currentPage === undefined) {
        currentPage = 1;
      }
      let start = (currentPage - 1) * per_page;
      for (let i = start; i < start + per_page; i++) {
        if (i >= data.length) {
          break;
        }
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({ listproduct: result, totalPage: totalPage, currentPage: currentPage });
    } catch (error) {
      next(error);
    }
  }
  ,
  showDetailProduct: async (req, res, next) => {
    try {
      let IDproduct = req.query.id;
      let p = await productM.getByID(IDproduct);
      let idCate = p.typeId;

      console.log(idCate);
      let relatedProduct = await productM.getProductByCate(idCate)
      console.log(relatedProduct);
      //console.log(p);
      res.render("common/detailProduct", { product: p, isDetail: true, relatedProduct: relatedProduct });
    } catch (error) {
      next(error);
    }
  }
};
