const orderDetail = require('../../models/orderDetail.m')

class orderDetailController {

    async show(req, res, next) {
        try {
            //res.render('test/testOrderDetail', { layout: false })
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            let listOrderDetails = await orderDetail.selectAllOrderDetail();
            return res.status(200).json({ listOrderDetails: listOrderDetails });
        } catch (error) {
            next(error);
        }
    }

    async getByOrderId(req, res, next) {
        try {
            let id = req.params.id;
            let listOrderDetails = await orderDetail.getOrderDetailByOrderId(id);
            return res.status(200).json({ listOrderDetails: listOrderDetails })
        } catch (error) {
            next(error);
        }
    }

    async insert(req, res, next) {
        try {
            const { orderId, productId, quantity } = req.query;
            let ordDe = new orderDetail(orderId, productId, quantity);
            let rs = await orderDetail.insertOrderDetail(ordDe);
            return res.status(200).json({ msg: "Insert Successfully !!!" });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            console.log(req.params);
            const { id1, id2 } = req.params;
            let rs = await orderDetail.deleteOrderDetail(id1, id2);
            return res.status(200).json({ msg: "Delete Successfully" });
        } catch (error) {
            next(error);
        }
    }

    async deleteByOrderId(req, res, next) {
        try {
            const id = req.params.id;
            let rs = await orderDetail.deleteOrderDetailByOrderId(id);
            return res.status(200).json({ msg: "Delete Successfully" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new orderDetailController;