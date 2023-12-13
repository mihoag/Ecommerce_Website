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
            let data = await db.selectByID("Order", "userID", id)
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
            let data = await db.update("Order", Order, "orderId", Order.id);
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
}
