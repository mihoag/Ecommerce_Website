const express = require("express");
const router = express.Router();
const APIController = require("../controller/api.c");
router.get("/get-payment-trans", APIController.getPaymentTrans);
router.get("/get-add-trans", APIController.getAddTrans);
router.get("/get-admin-balance", APIController.getAdminBalance);
module.exports = router;