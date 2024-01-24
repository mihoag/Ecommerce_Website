const express = require("express");
const router = express.Router();
const customersController = require('../../../controllers/sites/admin/customers.c')

router.get('/customers', customersController.showCustomers)
router.get('/', customersController.showCustomers)
router.get('/getPerpage', customersController.getCustomerPerPage)
router.get('/searchcustomer', customersController.getSearchCustomer)

module.exports = router;