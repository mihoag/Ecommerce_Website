const cartModel = require('../../models/cart.m')
class cartUserController {
    async showCart(req, res, next) {
        try {
            res.render('user/cart', { layout: false });
        } catch (error) {
            next(error)
        }
    }

    async listCart(req, res, next) {
        try {
            let idUser = req.query.userId;
            let listProductinCart = await cartModel.selectByUserId(idUser);
            return res.json({ listPCart: listProductinCart });
        } catch (error) {
            next(error)
        }
    }

    async updateCart(req, res, next) {
        try {
            console.log(req.query)
            const { userId, productId, timeAddToCart, quantity } = req.query;
            //console.log(userId, productId, timeAddToCart, quantity);
            let updatedCart = new cartModel(userId, productId, timeAddToCart, quantity);
            //console.log(updatedCart);
            await cartModel.updateQuantity(updatedCart);
            res.json({ status: "ok" })
            //console.log(check);
        } catch (error) {
            next(error);
        }
    }
    async insertCart(req, res, next) {
        try {
            const { userId, productId, timeAddToCart, quantity } = req.query;
            let newCart = new cartModel(userId, productId, timeAddToCart, quantity)
            await cartModel.insertToCart(newCart);
            res.json({ status: "ok" })
        } catch (error) {
            next(error);
        }

    }
}
module.exports = new cartUserController;
