const express = require("express");
const router = express.Router();
const brandsController = require('../../../controllers/sites/admin/brands.c')

router.get('/brands', brandsController.showBrands)
module.exports = router;