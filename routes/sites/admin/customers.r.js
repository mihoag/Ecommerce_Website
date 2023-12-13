const express = require("express");
const router = express.Router();
const customersController = require('../../../controllers/sites/admin/customers.c')

router.get('/customers', customersController.showCustomers)
module.exports = router;