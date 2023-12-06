const express = require("express");
const router = express.Router();
const detailproductController = require('../../../controllers/sites/common/detailProduct.c');


router.get('/', detailproductController.showDetailProduct);
module.exports = router;