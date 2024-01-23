const express = require("express");
const router = express.Router();
const productsController = require('../../../controllers/sites/admin/products.c')

router.get('/products', productsController.showProducts)
module.exports = router;