const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/sites/cart.c");

router.get("/", cartController.showCart)

module.exports = router;
