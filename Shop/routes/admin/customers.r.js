const express = require("express");
const router = express.Router();
const customersController = require('../../controllers/admin/customers.c')

router.get('/customers', customersController.showCustomers)
router.get('/one/:email', customersController.getOneCustomer)
router.get('/', customersController.showCustomers)
router.post('/add', customersController.addNewCustomer)
router.post('/update', customersController.updateCustomer)
router.delete('/delete/:email', customersController.deleteCustomer)
router.get('/getPerpage', customersController.getCustomerPerPage)
router.get('/searchcustomer', customersController.getSearchCustomer)

module.exports = router;