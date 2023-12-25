const db = require('../db/db')
module.exports = class comment {
    constructor(userId, productId, timeAdd, quantity) {
        this.userId = userId;
        this.productId = productId;
        this.timeAddToCart = timeAdd;
        this.quantity = quantity;
    }

    static async selectByUserId(id) {
        try {
            let data = await db.selectJoinTable("Cart", "Product", "productId", "productId", "userId", id)
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async insertToCart(cart) {
        try {
            let data = await db.insert("Cart", cart);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async updateQuantity(cart) {
        try {
            // console.log(cart);
            let data = await db.update2("Cart", cart, "userId", "productId", cart.userId, cart.productId);
            return data;
        } catch (error) {
            throw error;
        }
    }


}

