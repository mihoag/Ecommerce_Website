const express = require("express");
const router = express.Router();
const productsController = require('../../controllers/admin/products.c')
const upload = require("../../utils/multer");

router.get('/products', productsController.showProducts)
router.get('/', productsController.showProducts)
router.post('/add', upload.single("image"), productsController.addProduct)
router.post('/update', upload.single("image"), productsController.updateProduct)
router.get('/get-product', productsController.getProduct)
router.post('/deactivate', productsController.deactivateProduct)
module.exports = router;