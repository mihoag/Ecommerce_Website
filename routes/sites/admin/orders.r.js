const express = require("express");
const router = express.Router();
const ordersController = require('../../../controllers/sites/admin/orders.c')

router.get('/orders', ordersController.showOrders)
module.exports = router;