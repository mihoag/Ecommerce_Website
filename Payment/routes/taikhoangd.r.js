const express = require("express");
const ktgdController = require("../controller/taikhoangd.c");
const router = express.Router();

router.post("/delete", ktgdController.deleteTaiKhoan)
router.post("/update", ktgdController.updateTaiKhoan);
router.post("/", ktgdController.insertTaiKhoan);


module.exports = router;
