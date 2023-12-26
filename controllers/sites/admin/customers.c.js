const userM = require("../../../models/users.m")
const moment = require("moment");

class customersController {
  async showCustomers(req, res, next) {
    try {
      res.render("admin/customers", {
        layout: "adminLayout",
        title: "Customers",
        isCustomers: true,
        css: "customers",
        js: "customers",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCustomerPerPage(req, res, next) {
    try {

      let data = await userM.getUser();

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
        data[i].password = ""
        data[i].timeJoined_m = moment(data[i].timeJoined).format('DD MMM YYYY')
        data[i].lastOnline_m = moment(data[i].lastOnline).format('DD MMM YYYY')
        data[i].timeJoined = moment(data[i].timeJoined).format('DD MMM YY')
        data[i].lastOnline = moment(data[i].lastOnline).format('DD MMM YY')
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listcustomer: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error)
    }
  }

  async getSearchCustomer(req, res, next) {
    try {
      let keyword = req.query.keyword;
      let data = await userM.getUserSearch(keyword);

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
        data[i].password = ""
        data[i].timeJoined_m = moment(data[i].timeJoined).format('DD MMM YYYY')
        data[i].lastOnline_m = moment(data[i].lastOnline).format('DD MMM YYYY')
        data[i].timeJoined = moment(data[i].timeJoined).format('DD MMM YY')
        data[i].lastOnline = moment(data[i].lastOnline).format('DD MMM YY')
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listcustomer: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new customersController();