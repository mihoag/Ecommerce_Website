const db = require('../db/db')

module.exports = class order {
  constructor(orderId, userID, address, reciverName, phoneNumber, totalCost, isPayment, status) {
    this.orderId = orderId
    this.userID = userID
    this.address = address
    this.reciverName = reciverName
    this.phoneNumber = phoneNumber
    this.totalCost = totalCost
    this.isPayment = isPayment
    this.status = status
  }

  static async selectAllOrder() {
    try {
      let data = await db.selectAll("Order");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getOrderByUserId(id) {
    try {
      let data = await db.selectByOneField("Order", "userId", id);
      return data;
    }
    catch (error) {
      throw error;
    }
  }

  static async insertOrder(Order) {
    try {
      let data = await db.insert("Order", Order);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(Order) {
    try {
      let data = await db.update("Order", Order, "orderId", Order.orderId);
      return data;
    } catch (error) {
      throw error
    }
  }

  static async deleteOrder(id) {
    try {
      let data = await db.delete("Order", "orderId", id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllOrder() {
    try {
      const rs = await db.getAllOrder();
      return rs;
    } catch (error) {
      throw error;
    }
  }

  static async getDetailOrder(orderId) {
    try {
      const rs = await db.getDetailOrder(orderId);
      return rs;
    } catch (error) {
      throw error;
    }
  }

  static async getSearchOrder(keyword) {
    try {
      const rs = await db.getSearchOrder(keyword);
      return rs;
    } catch (error) {
      throw error;
    }
  }
  static async getMaxId() {
    try {
      let data = await db.selectMax("Order", "orderId");
      if (!data.max) {
        return 0;
      }
      //console.log(data);
      //console.log(data[0]);
      return data.max;
      //return data[0];
    } catch (error) {
      console.log(error);
    }
  }


}
