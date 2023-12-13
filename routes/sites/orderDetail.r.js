const express = require("express");
const router = express.Router();
const orderDetailController = require('../../controllers/sites/orderDetail.c');

router.get('/show', orderDetailController.show);
router.post('/insert', orderDetailController.insert);
router.delete('/:id1/:id2', orderDetailController.delete);
router.delete('/:id', orderDetailController.deleteByOrderId);
router.get('/:id', orderDetailController.getByOrderId)
router.get('/', orderDetailController.getAll)

module.exports = router;