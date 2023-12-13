class ordersController {
    async showOrders(req, res, next) {
        try {
            res.render("admin/orders", {
                layout: "adminLayout",
                title: "Orders",
                isOrders: true,
                css: 'orders',
                js: 'orders',   
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new ordersController();