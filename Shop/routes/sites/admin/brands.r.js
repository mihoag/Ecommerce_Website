const express = require("express");
const router = express.Router();
const brandsController = require('../../../controllers/sites/admin/brands.c')

router.get('/', brandsController.showBrands)
router.get('/:typeId', brandsController.getDataTypeById)

module.exports = router;