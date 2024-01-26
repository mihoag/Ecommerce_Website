const express = require("express");
const router = express.Router();
const ordersController = require('../../controllers/admin/orders.c')

router.get('/', ordersController.showOrders)
router.get('/getPerpage', ordersController.getOrderPerPage)
router.get('/getDetail', ordersController.getCustomerDetailPerPage)
router.get('/searchorder', ordersController.getSearchOrder)
router.post('/updateStatus', ordersController.update)
module.exports = router;