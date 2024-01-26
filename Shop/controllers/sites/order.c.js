const order = require('../../models/order.m')
const cartModel = require('../../models/cart.m')
const productM = require('../../models/product.m')
const orderDetail = require('../../models/orderDetail.m')
const { pgp, db } = require("../../configs/DBconnection");
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
      // console.log(id);
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


  async processOrder(req, res, next) {
    try {
      var check = false;
      const data = req.body;
      console.log(data);
      // update so luong san pham
      var listCart = await cartModel.selectByUserId(data.idUser);

      //console.log(listCart);
      for (let i = 0; i < listCart.length; i++) {
        await productM.updateAmount(listCart[i].productId, listCart[i].quantity);
      }
      check = true;

      // 
      let totalCost = 0;
      for (let i = 0; i < listCart.length; i++) {
        totalCost += (100 - listCart[i].discount) * listCart[i].price * listCart[i].quantity / 100;

      }

      //console.log(maxId);
      let maxId = await order.getMaxId();
      //console.log(maxId);
      let idOrder = maxId + 1;

      // them mot hoa don vao ...

      let rs = await db.one(`insert into "Order"("orderId","userId", address, "reciverName", "phoneNumber", "totalCost", "isPayment", status, "timeOrder")
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`, [idOrder, data.idUser, data.address, data.recievername, data.phonenumber, totalCost, false, "Pending", data.time]);


      // Them vao detailOrder

      for (let i = 0; i < listCart.length; i++) {
        let od = new orderDetail(idOrder, listCart[i].productId, listCart[i].quantity)
        await orderDetail.insertOrderDetail(od);
      }
      //idUser: idUser, address: address, recievername: recievername, phonenumber: phonenumber, time: time 
      return res.status(200).json({ msg: "Đặt hàng thành công", data: rs })
    } catch (error) {
      console.log(error)
      if (check) {
        // rollback
        for (let i = 0; i < listCart.length; i++) {
          await productM.updateAmount1(listCart[i].productId, listCart[i].quantity);
        }
      }
      return res.status(400).json({ msg: "Đặt hàng thất bại" })
    }
  }

  async updateOrderPayment(req, res, next) {
    try {
      let idOrder = req.body.idOrder;
      await db.none(`update "Order" set "isPayment" = 'true' where "orderId" = $1`, idOrder);
      return res.status(200).json({ msg: "Cập nhật thành công" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Cập nhật thất bại" });
    }
  }


  async rollbackProcessPayment(req, res) {
    try {
      ///
      let idOrder = req.body.idOrder;
      let listOrder = await orderDetail.getOrderDetailByOrderId(idOrder);
      for (let i = 0; i < listOrder.length; i++) {
        await productM.updateAmount1(listOrder[i].productId, listOrder[i].quantity);
      }
      await orderDetail.deleteOrderDetailByOrderID(idOrder);
      await order.deleteOrder(idOrder);
      return res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
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
