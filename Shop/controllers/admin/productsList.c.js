const Product = require("../../models/product.m");
const ProductList = require("../../models/productsList.m");

function handleReleaseDate(releaseDate) {
  const inputDate = new Date(releaseDate);
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = inputDate.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  let vndFormatted = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return vndFormatted;
}

class productsListController {
  async showProductsList(req, res, next) {
    try {
      const items = await Product.getMoreInfo();
      items.forEach((item) => {
        item.price = convertToVND(item.price);
        item.giagiam = convertToVND(item.giagiam);
        item.releaseDate = handleReleaseDate(item.releaseDate);
      });
      const lists = await ProductList.getAll();
      res.render("admin/productsList", {
        layout: "adminLayout",
        title: "Products List",
        isProductsList: true,
        css: "productsList",
        js: "productsList",
        items: items,
        lists: lists,
      });
    } catch (error) {
      next(error);
    }
  }

  async addList(req, res, next) {
    try {
      const result = await ProductList.add(req.body);
      if (result) {
        res.status(200).json("Thêm danh mục thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteList(req, res, next) {
    try {
      const result = await ProductList.delete(req.body.listId);
      if (result) {
        res.status(200).json("Xóa danh mục thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }
  async updateList(req, res, next) {
    try {
      const result = await ProductList.update(req.body);
      if (result) {
        res.status(200).json("Cập nhập danh mục thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }

  async sortList(req, res, next) {
    try {
      const data = req.body;
      data.forEach(async (list) => {
        await ProductList.sort(list);
      });
    } catch (error) {
      next(error);
    }
  }

  async sortItemsList(req, res, next) {
    try {
      const type = req.query.type;
      var data;
      if (type === "default") {
        data = await Product.getMoreInfo();
      } else if (type === "rate") {
        data = await Product.getProductRated();
      } else if (type === "newest") {
        data = await Product.getProductNewest();
      } else if (type === "modern") {
        data = await Product.getProductModern();
      } else if (type === "discount") {
        data = await Product.getProductDiscount();
      } else if (type === "cheapest") {
        data = await Product.getProductCheapest();
      }
      data.forEach((item) => {
        item.price = convertToVND(item.price);
        item.giagiam = convertToVND(item.giagiam);
        item.releaseDate = handleReleaseDate(item.releaseDate);
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getListItemsForUpdate(req, res, next) {
    try {
      const result = await ProductList.getListItemsForUpdate(req.query.id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(null);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new productsListController();
