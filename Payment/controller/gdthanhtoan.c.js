const gdttModel = require("../model/gdthanhtoan.m");
const taikhoangd = require("../model/taikhoangd.m");
const tkgdModel = require("../model/taikhoangd.m");
const { verifyToken } = require("../Util/helper.token")


module.exports = {
    processPayment: async (req, res, next) => {
        try {
            console.log(req.body);
            var check = false;
            const { email, total, time, noidung, idhoadon } = req.body;
            const token = req.body.token;
            const verify = await verifyToken(
                token,
                process.env.JWT_SECRET_PAYMENT,
            );
            if (!verify || !verify.email || verify.email != email) {
                return res.status(400).json({ msg: "token khong hop le" });
            }


            var acc = await taikhoangd.getTaiKhoanByUsername(email);
            var accAdmin = await taikhoangd.getTaiKhoanByUsername(process.env.email_admin);

            if (acc.balance < total) {
                return res.status(400).json({ msg: "Số dư tài khoản không đủ" });
            }
            var oldBalance = acc.balance;
            var oldBalanceAdmin = accAdmin.balance;
            acc.balance -= total;
            accAdmin.balance += total;

            ///
            await tkgdModel.updateTaiKhoanByUsername(acc);
            await tkgdModel.updateTaiKhoanByUsername(accAdmin);


            check = true;
            /// ghi thong tin giao dich
            let maxId = await gdttModel.getMaxID();
            let gdtt;
            //  console.log(time);
            if (!maxId) {
                gdtt = new gdttModel(1, email, process.env.email_admin, total, time, noidung, idhoadon);
            }
            else {
                gdtt = new gdttModel(parseInt(maxId.max) + 1, email, process.env.email_admin, total, time, noidung, idhoadon);
            }

            await gdttModel.insertGDthanhtoan(gdtt);
            return res.status(200).json({ msg: "Thanh toán thành công" })
        } catch (error) {
            console.log(error);
            if (check) {
                // rollback 
                acc.balance = oldBalance;
                accAdmin.balance = oldBalanceAdmin;
                await tkgdModel.updateTaiKhoanByUsername(acc);
                await tkgdModel.updateTaiKhoanByUsername(accAdmin);
            }
            return res.status(400).json({ msg: "Thanh toán thất bại" })
        }
    },
};
