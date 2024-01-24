const express = require("express");
const router = express.Router();
const statisticsController = require('../../../controllers/sites/admin/statistics.c')

router.get('/', statisticsController.showStatistics)
router.get('/top5/:time', statisticsController.getTop5Products)
router.get('/revenue/:month/:year', statisticsController.getDataRevenue)
router.get('/revenueW/:from/:to', statisticsController.getDataRevenueW)

module.exports = router;