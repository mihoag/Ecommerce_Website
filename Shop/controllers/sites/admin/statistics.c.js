const statisticsM = require('../../../models/statistics.m');
const productsM = require('../../../models/product.m');

class statisticsController {
  async showStatistics(req, res, next) {
    try {
      const products = await productsM.countProducts();
      const todayRevenue = await statisticsM.getTodayRevenue();
      const monthRevenue = await statisticsM.getMonthRevenue();

      res.render("admin/statistics", {
        layout: "adminLayout",
        title: "Statistics",
        isStatistics: true,
        css: "statistics",
        js: 'statistics',
        data: {
          products: products.sum,
          today: todayRevenue.sum || 0,
          month: monthRevenue.sum || 0
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getDataRevenue(req, res, next) {
    try {
      const { month, year } = req.params;
      const rs = await statisticsM.getRevenue(month, year);
      res.json(rs);
    } catch (error) {
      next(error);
    }
  }

  async getDataRevenueW(req, res, next) {
    try {
      let { from, to } = req.params
      const rs = await statisticsM.getRevenueWeek(from, to);
      res.json(rs);
    } catch (error) {
      next(error);
    }
  }

  async getTop5Products(req, res, next) {
    try {
      let time = req.params.time || "";
      try {
        time = parseInt(time, 10);
      } catch (error) {
        time = "";
      }
      const rs = await statisticsM.getTop5(time);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new statisticsController();