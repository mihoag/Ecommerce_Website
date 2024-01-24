const express = require("express");
const router = express.Router();

router.use('/', require('./dashboard.r'))
router.use('/dashboard', require('./dashboard.r'))
router.use('/brands', require('./brands.r'))
router.use('/customers', require('./customers.r'))
router.use('/products', require('./products.r'))
router.use('/products-list', require('./productsList.r'))
router.use('/orders', require('./orders.r'))
router.use('/statistics', require('./statistics.r'))
router.use('/settings', require('./settings.r'))

module.exports = router;