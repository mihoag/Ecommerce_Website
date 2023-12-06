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
            console.log(query)
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
    }
}