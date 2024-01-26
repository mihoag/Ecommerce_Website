const orderM = require('../../models/order.m')
const moment = require("moment");

class ordersController {
  async showOrders(req, res, next) {
    try {
      res.render("admin/orders", {
        layout: "adminLayout",
        title: "Orders",
        isOrders: true,
        css: 'orders',
        js: 'orders',
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderPerPage(req, res, next) {
    try {
      let data = await orderM.getAllOrder()

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
        data[i].timeOrder = moment(data[i].timeOrder).format('DD MMM YY')
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listorder: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error)
    }
  }

  async getCustomerDetailPerPage(req, res, next) {
    try {
      const orderId = req.query.orderId;
      const data = await orderM.getDetailOrder(orderId);
      if (data.length > 0)
        data[0].timeOrder = moment(data[0].timeOrder).format('DD MMM YYYY')
      res.json(data);
    } catch (error) {
      next(error)
    }
  }

  async getSearchOrder(req, res, next) {
    try {
      const keyword = req.query.keyword;
      let data = await orderM.getSearchOrder(keyword)

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
        data[i].timeOrder = moment(data[i].timeOrder).format('DD MMM YY')
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listorder: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await orderM.updateOrder({isPayment: true, status: 'Paid', orderId: req.body.orderId});
      if (result) {
        res.status(200).json("Cập nhập trạng thái thành công");
      } else {
        res.status(406).json("Có lỗi xảy ra");
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ordersController();