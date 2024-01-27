const db = require("../db/db");
const rq = require("../configs/DBconnection");
const DB = rq.db;

module.exports = class gdthanhtoan {
  constructor(
    idgiaodich,
    username1,
    username2,
    sotien,
    ngaygio,
    noidung,
    idhoadon
  ) {
    this.idgiaodich = idgiaodich;
    this.username1 = username1;
    this.username2 = username2;
    this.sotien = sotien;
    this.ngaygio = ngaygio;
    this.noidung = noidung;
    this.idhoadon = idhoadon;
  }
  static async insertGDthanhtoan(bill) {
    try {
      let data = await db.insert("gdthanhtoan", bill);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getMaxID() {
    try {
      let data = await db.selectMax("gdthanhtoan", "idgiaodich");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateGDthanhtoan(bill) {
    try {
      await db.update("gdthanhtoan", bill);
    } catch (error) {
      throw error;
    }
  }

  static async deleteGDByUsername(username) {
    try {
      let data = await db.delete("gdthanhtoan", "username1", username);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getPaymentTrans() {
    let dbcn = null;
    try {
      dbcn = await DB.connect();
      let trans = await dbcn.any(
        `SELECT * FROM GDthanhtoan ORDER BY "ngaygio" DESC`
      );
      const listTrans = await Promise.all(
        trans.map(async (tran) => {
          const date = new Date(tran.ngaygio);
          const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          };
          const formattedDateTime = date.toLocaleDateString("vi-VN", options);
          tran.ngaygio = formattedDateTime;
          return tran;
        })
      );
      return listTrans;
    } catch (error) {
      throw error;
    }
  }
};
