const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getAll: async () => {
    const rs = await db.any('SELECT * FROM "Type"');
    return rs;
  },
  add: async (data) => {
    const rs = await db.one(
      'INSERT INTO "Type"("name") VALUES($1) RETURNING *',
      [data.name]
    );
    return rs;
  },
  getByName: async (name) => {
    const rs = await db.any('SELECT * FROM "Type" WHERE "name"=$1', [name]);
    return rs;
  },
  getById: async (id) => {
    const rs = await db.any('SELECT * FROM "Type" WHERE "typeId"=$1', [id]);
    return rs;
  },
  updateActiveType: async (id) => {
    const rs = await db.one(
      'UPDATE "Type" SET "active"=false WHERE "typeId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
  update: async (data) => {
    const rs = await db.one(
      'UPDATE "Type" SET "name"=$1 WHERE "typeId"=$2 RETURNING *',
      [data.name, data.typeId]
    );
    return rs;
  },
  delete: async (id) => {
    const rs = await db.one(
      'DELETE FROM "Type" WHERE "typeId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
};
