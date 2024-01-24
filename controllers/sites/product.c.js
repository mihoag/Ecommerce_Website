const productM = require("../../models/product.m");
const typeM = require("../../models/product.m");
const my_cloudinary = require("../../configs/myCloudinary");
const moment = require("moment");

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
      let data;
      if (req.query?.showType === 'admin') {
        data = await productM.getMoreInfo();
      }
      else data = await productM.getAll();

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
        if (data[i].releaseDate !== undefined) {
          data[i].releaseDate_m = moment(data[i].releaseDate).format('DD MMM YYYY')
          data[i].releaseDate = moment(data[i].releaseDate).format('DD MMM YY')
        }
        result.push(data[i]);
      }

      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listproduct: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error);
    }
  },
  getSearchProductPerPage: async (req, res, next) => {
    try {
      let keyword = req.query.keyword;
      let data;
      if (req.query?.showType === 'admin') {
        data = await productM.getSearchMoreInfo(keyword);
      }
      else
        data = await productM.selectProductByNameandCate(keyword);

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
        if (data[i].releaseDate !== undefined) {
          data[i].releaseDate_m = moment(data[i].releaseDate).format('DD MMM YYYY')
          data[i].releaseDate = moment(data[i].releaseDate).format('DD MMM YY')
        }
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listproduct: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error);
    }
  },
  showDetailProduct: async (req, res, next) => {
    try {
      let IDproduct = req.query.id;
      let p = await productM.getByID(IDproduct);
      let idCate = p.typeId;

      //console.log(idCate);
      let relatedProduct = await productM.getProductByCate(idCate);
      //console.log(relatedProduct);
      //console.log(p);
      res.render("common/detailProduct", {
        product: p,
        isDetail: true,
        relatedProduct: relatedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  filterProductPerPage: async (req, res, next) => {
    try {
      let filters = req.query.filters;
      //console.log(filters);
      let data = {};
      let data1, data2, data3, data4, data5;
      let begin;
      for (const key in filters) {
        if(filters.hasOwnProperty(key)) {
          if(key === "sort") {
            const type = filters[key].split('-')[0];
            const sort = filters[key].split('-')[1];
            if (sort === "asc") {
              data1 = await productM.getProductAsc(type);
            } else if (sort === "desc") {
              data1 = await productM.getProductDesc(type);
            }
          }
          if(key === "category") {
            const category = filters[key];
            if (category === "rated") {
              data2 = await productM.getProductRated();
            } else if (category === "newest") {
              data2 = await productM.getProductNewest();
            } else if (category === "modern") {
              data2 = await productM.getProductModern();
            } else if (category === "discount") {
              data2 = await productM.getProductDiscount();
            } else if (category === "cheapest") {
              data2 = await productM.getProductCheapest();
            }
          }
          if(key === "name") {
            const name = filters[key];
            data3 = await productM.getProductByType(name);
          }
          if(key === "begin") {
            begin = filters[key];
          }
          if(key === "end") {
            const end = filters[key];
            data4 = await productM.getProductByCost(begin, end);
          }
          if(key === "star") {
            const star = filters[key];
            data5 = await productM.getProductByStar(star);
          }
          
        }
      }
      //console.log(data4);
      // Lọc và bỏ qua những mảng undefined
      let validArrays = [data1, data2, data3, data4, data5].filter(arr => arr !== undefined);
      
      if (validArrays.length > 0) {
        // Kiểm tra và xóa những phần tử undefined từ mảng validArrays
        validArrays = validArrays.filter(arr => arr !== undefined);
        //console.log(validArrays);
        if (validArrays.length === 1) {
          data = validArrays[0];
        }
      
        if (validArrays.length > 1) {
          // lấy ra các phần tử chung của các mảng trong validArrays
          data = validArrays[0].filter(obj1 =>
            validArrays.slice(1).every(arr =>
              arr.some(obj => obj.productId === obj1.productId)
            )
          );
        }
      }

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
        if (data[i].releaseDate !== undefined) {
          data[i].releaseDate_m = moment(data[i].releaseDate).format('DD MMM YYYY')
          data[i].releaseDate = moment(data[i].releaseDate).format('DD MMM YY')
        }
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listproduct: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error);
    }
  },
};
