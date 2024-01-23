class maintenanceController {
    async showMaintenance(req, res, next) {
        try {
            res.render("common/maintenance", { title: "Bảo hành" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new maintenanceController();