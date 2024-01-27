const Transactions = require('../../models/transaction.m')

class transactionsController {
  async showTransactions(req, res, next) {
    try {
      const payments = await Transactions.getPaymentTransactions(1, null, null, null);
      const adds = await Transactions.getAddMoneyTransactions();
      const adminBalance = await Transactions.getAdminBalance();
      res.render("admin/transactions", {
        layout: "adminLayout",
        title: "Admin Transactions",
        isTransactions: true,
        css: "transactions",
        js: "transactions",
        payments: payments,
        adds: adds,
        adminBalance: adminBalance
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentTransactions(req, res, next) {
    const search = req.query.search;
    const pageNum = req.query.page;
    const start = req.query.start;
    const end = req.query.end;
    const payments = await Transactions.getPaymentTransactions(pageNum, search, start, end);
    if(payments) {
      res.status(200).json(payments);
    } else {
      res.status(404).json(null);
    }
  }

  async getAddMoneyTransactions(req, res, next) {
    const search = req.query.search;
    const pageNum = req.query.page;
    const start = req.query.start;
    const end = req.query.end;
    const payments = await Transactions.getAddMoneyTransactions(pageNum, search, start, end);
    if(payments) {
      res.status(200).json(payments);
    } else {
      res.status(404).json(null);
    }
  }
}
module.exports = new transactionsController();
