const db = require('../db/db')

module.exports = class orderDetail {
    constructor(orderId, productId, quantity) {
        this.orderId = orderId
        this.productId = productId
        this.quantity = quantity
    }

    static async selectAllOrderDetail() {
        try {
            let data = await db.selectAll("OrderDetail");
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getOrderDetailByOrderId(id) {
        try {
            let data = await db.selectByID("Order", "orderId", id)
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async insertOrderDetail(OrderDetail) {
        try {
            let data = await db.insert("OrderDetail", OrderDetail);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async updateOrderDetail(OrderDetail) {
        try {
            let data = await db.update2("Order", Order, "orderId", OrderDetail.orderId, "productId", OrderDetail.productId);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async deleteOrderDetail(id1, id2) {
        try {
            let data = await db.delete2("Order", "orderId", id1, "productId", id2);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteOrderDetailByOrderID(id) {
        try {
            let data = await db.delete("Order", "orderId", id);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
