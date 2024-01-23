class maintenanceController {
    async showMaintenance(req, res, next) {
        try {
            res.render("common/maintenance");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new maintenanceController();