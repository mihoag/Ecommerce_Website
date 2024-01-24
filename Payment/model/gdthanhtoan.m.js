const db = require('../db/db')

module.exports = class gdthanhtoan {
    constructor(idgiaodich, username1, username2, sotien, ngaygio, noidung, idhoadon) {
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
            throw error
        }
    }


    static async deleteGDByUsername(username) {
        try {
            let data = await db.delete("gdthanhtoan", "username1", username);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

}

