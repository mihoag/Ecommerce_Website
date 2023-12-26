const express = require("express");
const router = express.Router();

router.get('/dashboard', require('./dashboard.r'))
router.use('/customers', require('./customers.r'))
router.get('/brands', require('./brands.r'))
router.get('/products', require('./products.r'))
router.use('/orders', require('./orders.r'))
router.get('/statistics', require('./statistics.r'))
router.get('/settings', require('./settings.r'))

module.exports = router;