const Dashboard = require('../../models/dashboard.m')
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
      res.render("admin/dashboard", {
        layout: "adminLayout",
        title: "Admin Dashboard",
        isDashboard: true,
        css: "dashboard",
        js: "dashboard",
        todayProfit:  convertToVND(todayProfit),
        todayOrder: todayOrder,
        todaySale: convertToVND(todaySale),
        todayProduct: todayProduct,
        orderList: orderList,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new dashboardController();
