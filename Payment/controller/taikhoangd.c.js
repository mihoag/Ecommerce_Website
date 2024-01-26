const taikhoanModel = require("../model/taikhoangd.m");
const { verifyToken } = require("../Util/helper.token")
const moment = require("moment");
const sortObject = require('../Util/sortObject.u')

module.exports = {
  getVnPayReturn: async (req, res, next) => {
    try {
      const token = req.params.token;
      const verify = await verifyToken(
        token,
        process.env.JWT_SECRET_PAYMENT,
      );
      if (!verify || !verify.email) {
        return res.redirect('/');
      }

      let vnp_Params = req.query;

      let secureHash = vnp_Params["vnp_SecureHash"];
      let amount = parseInt(vnp_Params["vnp_Amount"]) || 0;

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);

      let config = require("../configs/default.json");
      let tmnCode = config["vnp_TmnCode"];
      let secretKey = config["vnp_HashSecret"];

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        if (vnp_Params["vnp_ResponseCode"] == "00") {
          // add money to email
          const account = await taikhoanModel.getTaiKhoanByUsername(verify.email);
          account.balance = (parseInt(account.balance) || 0) + amount / 100;
          await taikhoanModel.updateTaiKhoanByUsername(account);

          return res.redirect(`http://localhost:3001/detailUser`);
        } else return res.redirect(`http://localhost:3001/detailUser`);
      } else {
        return res.redirect(`http://localhost:3001/detailUser`);
      }
    } catch (error) {
      next(error);
    }
  },
  addMoney: async (req, res, next) => {
    try {
      const token = req.params.token;
      const verify = await verifyToken(
        token,
        process.env.JWT_SECRET_PAYMENT,
      );
      if (!verify || !verify.email || !req.body?.money) {
        return res.redirect('/');
      }

      // redirect to VNpay
      process.env.TZ = "Asia/Ho_Chi_Minh";

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      let config = require("../configs/default.json");
      let tmnCode = config["vnp_TmnCode"];
      let secretKey = config["vnp_HashSecret"];
      let vnpUrl = config["vnp_Url"];
      let returnUrl = config["vnp_ReturnUrl"] + `/${token}`;

      const { v4: uuidv4 } = require('uuid');
      let orderId = uuidv4();
      let amount = req.body.money;

      let locale = null;
      if (locale === null || locale === "") {
        locale = "vn";
      }
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Nạp tiền cho mã GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;

      vnp_Params = sortObject(vnp_Params);

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

      res.json(vnpUrl);
      //
    } catch (error) {
      next(error);
    }
  },
  getMoney: async (req, res, next) => {
    try {
      const token = req.params.token;

      const verify = await verifyToken(
        token,
        process.env.JWT_SECRET_PAYMENT,
      );

      if (!verify || !verify.email) {
        return res.redirect('/');
      }

      const money = await taikhoanModel.getMoney(verify.email);

      res.json(money || 0);
    } catch (error) {
      next(error);
    }
  },
  insertTaiKhoan: async (req, res) => {
    //const user = await userM.getByEmail("haonhat2729@gmail.com")
    const username = req.body.username;
    const isActive = req.body.isActive;
    let data = await taikhoanModel.getTaiKhoanByUsername(username);
    // console.log(data);
    if (data) {
      return res.status(400).json({ msg: "Username is existed" });
    }

    let account = new taikhoanModel(username, 0, isActive);
    let data1 = await taikhoanModel.insertTaiKhoan(account);
    return res.status(200).json({ msg: "Insert successully" });
  },

  updateTaiKhoan: async (req, res) => {
    const username = req.body.username;
    const isActive = req.body.isActive;
    let account = await taikhoanModel.getTaiKhoanByUsername(username);
    //console.log(account);
    if (!account) {
      return res.status(400).json({ msg: "Username is NOT existed" });
    }
    account.active = isActive;
    try {
      await taikhoanModel.updateTaiKhoanByUsername(account);
      return res.status(200).json({ msg: "update successfully" })
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  },

  deleteTaiKhoan: async (req, res) => {
    try {
      const username = req.body.username;
      await taikhoanModel.deleteTaiKhoanByUsername(username);
      return res.status(200).json({ msg: "delete sucessfully" })
    } catch (error) {
      return res.status(400).json({ msg: "delete fail" });
    }

  }
};
