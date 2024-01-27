const Dashboard = require('../../models/dashboard.m')
const userModel = require('../../models/users.m')
function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  let vndFormatted = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return vndFormatted;
}
class dashboardController {
  async showDashboard(req, res, next) {
    try {
      const todayProfit = await Dashboard.getTodayProfit();
      const todaySale = await Dashboard.getTodaySale();
      const todayProduct = await Dashboard.getTodayProduct();
      const todayOrder = await Dashboard.getTodayOrder();
      const orderList = await Dashboard.getOrderList();

      let idUser = req.session.uid || req.session.passport?.user?.userId;
      if (req.session.passport) {
        req.session.token = req.session.passport?.user?.token
      }
      let user = await userModel.getByID(idUser);


      res.render("admin/dashboard", {
        layout: "adminLayout",
        title: "Admin Dashboard",
        isDashboard: true,
        css: "dashboard",
        js: "dashboard",
        todayProfit: convertToVND(todayProfit),
        todayOrder: todayOrder,
        todaySale: convertToVND(todaySale),
        todayProduct: todayProduct,
        orderList: orderList,
        token: req.session.token,
        fullname: user[0].name, email: user[0].email
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new dashboardController();
