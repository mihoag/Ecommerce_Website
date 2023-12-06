const express = require("express");
const router = express.Router();
const maintenanceController = require('../../../controllers/sites/common/maintenace.c');


router.get('/', maintenanceController.showMaintenance);
module.exports = router;