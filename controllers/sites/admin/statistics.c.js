const statisticsM = require('../../../models/statistics.m');

class statisticsController {
  async showStatistics(req, res, next) {
    try {
      res.render("admin/statistics", {
        layout: "adminLayout",
        title: "Statistics",
        isStatistics: true,
        css: "statistics",
        js: 'statistics'
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
      const rs = await statisticsM.getTop5();
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new statisticsController();