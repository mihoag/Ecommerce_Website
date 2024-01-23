const db = require('../db/db')

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
}

