const db = require('../db/db')
const rq = require("../configs/DBconnection");
const DB = rq.db;
module.exports = class gdnaptien {
    constructor(idgiaodich, username, sotiennap, ngaygio) {
        this.idgiaodich = idgiaodich
        this.username = username;
        this.sotiennap = sotiennap;
        this.ngaygio = ngaygio;
    }
    static async insertGDnaptien(bill) {
        try {
            let data = await db.insert("gdnaptien", bill);
            return data;
        } catch (error) {
            throw error
        }
    }
    static async deleteGDnaptienByUsername(username) {
        try {
            let data = await db.delete("gdnaptien", "username", username);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async getAddTrans() {
        let dbcn = null;
        try {
          dbcn = await DB.connect();
          let trans = await dbcn.any(
            `SELECT * FROM GDnaptien ORDER BY "ngaygio" DESC`
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
}

