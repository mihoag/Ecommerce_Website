const express = require("express");
const gdttController = require("../controller/gdthanhtoan.c");
const router = express.Router();

router.post("/", gdttController.processPayment)
module.exports = router;
