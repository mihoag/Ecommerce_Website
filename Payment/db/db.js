const { pgp, db } = require("../configs/DBconnection");
module.exports =
{
    selectAll: async (tbName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            //let data = [];
            data = await dbcn.any(`SELECT * FROM "${tbName}"`);
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },
    selectByID: async (tbName, fieldname, value) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            data = await dbcn.oneOrNone(`SELECT * FROM "${tbName}" where "${fieldname}" = $1`, [value]);
            //  console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },
    selectJoinTable: async (tbName1, tbName2, joinName1, joinName2, fieldName, value) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            data = await dbcn.any(`select * from "${tbName1}" c, "${tbName2}" u where c."${joinName1}" = u."${joinName2}" and c."${fieldName}" =  $1 `, [value]);
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    }
    ,
    selectByOneField:
        async (tbName, fieldname, value) => {
            let dbcn = null;
            try {
                dbcn = await db.connect();
                data = await dbcn.any(`SELECT * FROM "${tbName}" where "${fieldname}" = $1`, [value]);
                //  console.log(data)
                return data;
            } catch (error) {
                throw error;
            }
            finally {
                dbcn.done();
            }
        }
    ,
    insert: async (tbName, entity) => {
        try {
            const query = pgp.helpers.insert(entity, null, tbName);
            //console.log(query)
            const data = await db.one(query + ` returning *`);
            return data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (tbName, fieldname, value) => {
        try {
            const rs = await db.none(`delete from "${tbName}" where "${fieldname}" = $1`, [value])
            return rs;
        } catch (error) {
            throw error;
        }
    },
    update: async (tbName, entity, fieldName, value) => {
        try {
            const query = pgp.helpers.update(entity, null, tbName) + ` where "${fieldName}" = $1`;
            const rs = await db.none(query, [value]);
            return rs;
        } catch (error) {
            throw error;
        }
    },
    selectMax: async (tbName, fieldName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            data = await dbcn.oneOrNone(`SELECT max("${fieldName}") FROM "${tbName}" `);
            console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },
    update2: async (tbName, entity, fieldName1, fieldName2, value1, value2) => {
        try {
            const query = pgp.helpers.update(entity, null, tbName) + ` where "${fieldName1}" = $1` + ` and "${fieldName2}" = $2`;
            //console.log(query);
            const rs = await db.none(query, [value1, value2]);
            return rs;
        } catch (error) {
            throw error;
        }
    },
    delete2: async (tbName, fieldname1, fieldname2, value1, value2) => {
        try {
            const query = `delete from "${tbName}" where "${fieldname1}" = $1 and "${fieldname2}" = $2`;
            //console.log(query);
            const rs = await db.none(query, [value1, value2]);
            return rs;
        } catch (error) {
            throw error;
        }
    },

    getAllOrder: async () => {
        try {
            const rs = db.any(`select o.*, u.name as name from "Order" o, "User" u where u."userId" = o."userId" order by o."timeOrder" desc`);
            return rs;
        } catch (error) {
            throw error;
        }
    },

    getDetailOrder: async (orderId) => {
        try {
            const rs = db.any(`select o.*, u.name as name, u.email, p.price, p.discount, p.name as pn, d.quantity from "Order" o, "User" u, "Product" p, "OrderDetail" d where o."orderId" = ${orderId} and u."userId" = o."userId" and d."orderId" = ${orderId} and p."productId" = d."productId"`);
            return rs;
        } catch (error) {
            throw error;
        }
    },

    getSearchOrder: async (keyword) => {
        try {
            const rs = db.any(`select o.*, u.name as name from "Order" o, "User" u where u."userId" = o."userId" and (u."name" ilike '%${keyword}%' or u."phoneNumber" ilike '%${keyword}%') order by o."timeOrder" desc`);
            return rs;
        } catch (error) {
            throw error;
        }
    }
}