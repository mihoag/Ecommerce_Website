const express = require("express");
const router = express.Router();
const brandsController = require('../../controllers/admin/brands.c')

router.get('/brands', brandsController.showBrands)
router.get('/', brandsController.showBrands)
router.get('/:typeId', brandsController.getDataTypeById)
router.post('/add', brandsController.addNewBrand)
router.post('/edit', brandsController.editBrand)
router.delete('/:typeId', brandsController.deleteBrand)

module.exports = router;