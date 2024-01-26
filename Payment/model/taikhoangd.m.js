const db = require('../db/db')
const gdntModel = require('./gdnaptien.m')
const gdttModel = require('./gdthanhtoan.m');


module.exports = class taikhoangd {
    constructor(username, balance, active) {
        this.username = username
        this.balance = balance
        this.active = active
    }
    static async insertTaiKhoan(account) {
        try {
            let data = await db.insert("taikhoangd", account);
            return data;
        } catch (error) {
            throw error
        }
    }
    static async getTaiKhoanByUsername(username) {
        try {
            let data = await db.selectByID("taikhoangd", "username", username);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async updateTaiKhoanByUsername(account) {
        try {
            await db.update("taikhoangd", account, "username", account.username);
        }
        catch (error) {
            throw error;
        }
    }

    static async deleteTaiKhoanByUsername(username) {
        try {
            let data1 = await gdntModel.deleteGDnaptienByUsername(username);
            let data2 = await gdttModel.deleteGDByUsername(username);
            let data = await db.delete("taikhoangd", "username", username);

        }
        catch (error) {
            throw error;
        }
    }
    static async getMoney(username) {
        try {
            let data = await db.selectByID("taikhoangd", "username", username);

            return data.balance;
        }
        catch (error) {
            throw error;
        }
    }
}

