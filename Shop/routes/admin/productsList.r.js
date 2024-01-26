const express = require("express");
const router = express.Router();
const productsListController = require('../../controllers/admin/productsList.c')

router.get('/products-list', productsListController.showProductsList)
router.get('/', productsListController.showProductsList)
router.post('/add', productsListController.addList)
router.post('/delete', productsListController.deleteList)
router.post('/update', productsListController.updateList)
router.post('/sort', productsListController.sortList)
router.get('/sort-items-list', productsListController.sortItemsList)
router.get('/get-list-update', productsListController.getListItemsForUpdate)

module.exports = router;