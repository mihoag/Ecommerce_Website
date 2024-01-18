const express = require("express");
const router = express.Router();

router.get('/dashboard', require('./dashboard.r'))
router.get('/brands', require('./brands.r'))
router.get('/customers', require('./customers.r'))
router.get('/products', require('./products.r'))
router.get('/orders', require('./orders.r'))
router.get('/statistics', require('./statistics.r'))
router.get('/settings', require('./settings.r'))

module.exports = router;