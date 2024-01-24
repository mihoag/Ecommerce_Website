const express = require("express");
const router = express.Router();
const dashboardController = require('../../../controllers/sites/admin/dashboard.c')

router.get('/dashboard', dashboardController.showDashboard)
router.get('/', dashboardController.showDashboard)
module.exports = router;