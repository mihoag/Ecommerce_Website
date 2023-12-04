const express = require("express");
const router = express.Router();

const controller = require("../../controllers/sites/type.c");
const authMiddleware = require("../../middlewares/auth.mws");

router.get("/all", controller.getAll);
router.post("/create", authMiddleware.isAdmin, controller.add);
router.post("/update/:id", authMiddleware.isAdmin, controller.update);

module.exports = router;
