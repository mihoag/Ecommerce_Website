class customersController {
    async showCustomers(req, res, next) {
        try {
            res.render("admin/customers", {
                layout: "adminLayout",
                title: "Customers",
                isCustomers: true,
                css: "customers",
                js: "customers",
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new customersController();