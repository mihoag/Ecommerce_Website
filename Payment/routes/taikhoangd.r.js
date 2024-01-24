const express = require("express");
const ktgdController = require("../controller/taikhoangd.c");
const router = express.Router();

router.post("/delete", ktgdController.deleteTaiKhoan)
router.post("/update", ktgdController.updateTaiKhoan);
router.post("/", ktgdController.insertTaiKhoan);
router.get('/vnpay_return/:token', ktgdController.getVnPayReturn);
router.post('/add/:token', ktgdController.addMoney);
router.get('/:token', ktgdController.getMoney);

module.exports = router;
