const userM = require("../../../models/users.m")
const moment = require("moment");

class customersController {
  async getOneCustomer(req, res, next) {
    try {
      const user = await userM.getByEmail(req.params.email);
      return res.json({ data: user[0] });
    } catch (error) {
      next(error);
    }
  }
  async deleteCustomer(req, res, next) {
    try {
      // check existing customer
      const check = await userM.getByEmail(req.params.email);
      if (check.length == 0) return res.json({ success: false, message: "Tài khoản này không tồn tại" })

      // delete the user
      const rs = await userM.deleteByEmail(req.params.email, check[0].userId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  async addNewCustomer(req, res, next) {
    try {
      //check have data
      const { name, email, phoneNumber, address } = req.body;
      if (!email || !phoneNumber || !address || !name)
        return res.json({ success: false, message: "Vui lòng điền đầy đủ thông tin" })
      // check email address exists
      const rs = await userM.getByEmail(email)
      if (rs.length > 0) {
        return res.json({ success: false, message: "Địa chỉ email này đã được người khác đăng ký" });
      }
      // all good => add new user account
      let newUser = req.body;
      newUser.password = "";
      newUser.avatar = `https://ui-avatars.com/api/?name=No+Name`;
      newUser.public_id = null;
      newUser.active = true;
      const user = await userM.add(newUser);
      if (!user) return res.json({ success: false });
      return res.json({ success: true, message: "Tạo mới tài khoản thành công" });
    } catch (error) {
      next(error);
    }
  }
  async updateCustomer(req, res, next) {
    try {
      //check have data
      const { name, email, phoneNumber, address } = req.body;
      if (!email || !phoneNumber || !address || !name)
        return res.json({ success: false, message: "Vui lòng điền đầy đủ thông tin" })
      // check email address exists
      const rs = await userM.getByEmail(email)
      if (rs.length <= 0) {
        return res.json({ success: false, message: "Địa chỉ email này không tồn tại" });
      }
      // all good => update user account
      let updateUser = rs[0];
      updateUser.name = req.body.name;
      updateUser.phoneNumber = req.body.phoneNumber;
      const user = await userM.update(updateUser);
      if (!user) return res.json({ success: false });
      return res.json({ success: true, message: "Cập nhật tài khoản thành công" });
    } catch (error) {
      next(error);
    }
  }

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
  async getCustomerPerPage(req, res, next) {
    try {

      let data = await userM.getUser();

      let result = [];
      const per_page = 10;
      let totalPage = parseInt(parseInt(data.length) / parseInt(per_page));
      if (data.length % per_page != 0) {
        totalPage++;
      }

      let currentPage = req.query.currentPage;
      if (currentPage === undefined) {
        currentPage = 1;
      }
      let start = (currentPage - 1) * per_page;
      for (let i = start; i < start + per_page; i++) {
        if (i >= data.length) {
          break;
        }
        data[i].password = ""
        data[i].timeJoined_m = moment(data[i].timeJoined).format('DD MMM YYYY')
        data[i].lastOnline_m = moment(data[i].lastOnline).format('DD MMM YYYY')
        data[i].timeJoined = moment(data[i].timeJoined).format('DD MMM YY')
        data[i].lastOnline = moment(data[i].lastOnline).format('DD MMM YY')
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listcustomer: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error)
    }
  }

  async getSearchCustomer(req, res, next) {
    try {
      let keyword = req.query.keyword;
      let data = await userM.getUserSearch(keyword);

      let result = [];
      const per_page = 10;
      let totalPage = parseInt(parseInt(data.length) / parseInt(per_page));
      if (data.length % per_page != 0) {
        totalPage++;
      }

      let currentPage = req.query.currentPage;
      if (currentPage === undefined) {
        currentPage = 1;
      }
      let start = (currentPage - 1) * per_page;
      for (let i = start; i < start + per_page; i++) {
        if (i >= data.length) {
          break;
        }
        data[i].password = ""
        data[i].timeJoined_m = moment(data[i].timeJoined).format('DD MMM YYYY')
        data[i].lastOnline_m = moment(data[i].lastOnline).format('DD MMM YYYY')
        data[i].timeJoined = moment(data[i].timeJoined).format('DD MMM YY')
        data[i].lastOnline = moment(data[i].lastOnline).format('DD MMM YY')
        result.push(data[i]);
      }
      /// Tao mot mang tu 1,2..., totalPae
      res.json({
        listcustomer: result,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new customersController();