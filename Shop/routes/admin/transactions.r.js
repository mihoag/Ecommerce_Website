const express = require("express");
const router = express.Router();
const transactionsController = require('../../controllers/admin/transactions.c')

router.get('/transactions', transactionsController.showTransactions)
router.get('/', transactionsController.showTransactions)
router.get('/getPaymentTransactions', transactionsController.getPaymentTransactions)
router.get('/getAddMoneyTransactions', transactionsController.getAddMoneyTransactions)
module.exports = router;