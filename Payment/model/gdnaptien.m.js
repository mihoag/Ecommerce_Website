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
          
          return trans;
        } catch (error) {
          throw error;
        }
      }
}

