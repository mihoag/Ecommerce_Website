const order = require('../../models/order.m')

class orderController {

  async show(req, res, next) {
    try {
      res.render('test/testOrder', { layout: false })
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      let listOrders = await order.selectAllOrder();
      return res.status(200).json({ listOrders: listOrders });
    } catch (error) {
      next(error);
    }
  }

  async getByUserId(req, res, next) {
    try {
      let id = req.params.id;
      let listOrders = await order.getOrderByUserId(id);
      return res.status(200).json({ listOrders: listOrders })
    } catch (error) {
      next(error);
    }
  }

  async insert(req, res, next) {
    try {
      const { orderId, userId, address, reciverName, phoneNumber, totalCost, isPayment, status } = req.query;
      let ord = new order(orderId, userId, address, reciverName, phoneNumber, totalCost, isPayment, status);
      let rs = await order.insertOrder(ord);
      return res.status(200).json({ msg: "Insert Successfully !!!" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      console.log(req.params);
      let id = req.params.id;
      let rs = await order.delete(id);
      return res.status(200).json({ msg: "Delete Successfully" })
    } catch (error) {
      next(error);
    }
  }

  // async updateSlide(req, res, next) {
  //     try {

  //     } catch (error) {
  //         next(error);
  //     }
  // }
}

module.exports = new orderController;
