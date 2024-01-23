const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/sites/cart.c");

router.get("/deleteCart", cartController.deleteCart)
router.get("/insertCart", cartController.insertCart);
router.get("/updateCart", cartController.updateCart)
router.get("/listcart", cartController.listCart)
router.get("/", cartController.showCart)

module.exports = router;
