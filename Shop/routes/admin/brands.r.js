const express = require("express");
const router = express.Router();
const brandsController = require('../../controllers/admin/brands.c')

router.get('/brands', brandsController.showBrands)
router.get('/', brandsController.showBrands)
router.get('/:typeId', brandsController.getDataTypeById)

module.exports = router;