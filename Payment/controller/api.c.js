const GDNT = require("../model/gdnaptien.m");
const GDTT = require("../model/gdthanhtoan.m");
const TK = require("../model/taikhoangd.m");
class APIController {
  async getAdminBalance(req, res, next) {
    try {
      const data = await TK.getMoney(req.query.admin);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json(null);
      }
    } catch (error) {
      next(error);
    }
  }
  async getPaymentTrans(req, res, next) {
    try {
      const data = await GDTT.getPaymentTrans();
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json(null);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAddTrans(req, res, next) {
    try {
      const data = await GDNT.getAddTrans();
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json(null);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new APIController();
