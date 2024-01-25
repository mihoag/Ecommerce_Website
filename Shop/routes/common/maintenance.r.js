const express = require("express");
const router = express.Router();
const maintenanceController = require('../../controllers/common/maintenace.c');


router.get('/', maintenanceController.showMaintenance);
module.exports = router;