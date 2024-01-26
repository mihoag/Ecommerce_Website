const express = require("express");
const router = express.Router();
const orderController = require('../../controllers/sites/order.c');

router.get('/show', orderController.show);
router.post('/orderpayment', orderController.processOrder);
router.post('/updateorder', orderController.updateOrderPayment);
router.post('/rollbackorder', orderController.rollbackProcessPayment);
router.post('/insert', orderController.insert);
router.delete('/:id', orderController.delete);
router.get('/:id', orderController.getByUserId)
router.get('/', orderController.getAll)

module.exports = router;