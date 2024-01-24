const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getTop5OfBrand: async (typeId) => {
    const rs = await db.any(`SELECT p.name, p.price, p.image, ROUND(p.price*(100-p.discount)/100) as discount, floor(p.rate) as rate, COUNT(*) as comment FROM "Type" t LEFT JOIN "Product" p ON p."typeId" = t."typeId" and t."typeId"=${typeId} LEFT JOIN "Comment" c ON c."productId" = p."productId" WHERE p."productId" in (select p."productId" from "Product" p, "OrderDetail" d WHERE p."productId" = d."productId" and p."typeId" = t."typeId" GROUP BY p."productId" ORDER BY SUM(d."quantity") DESC LIMIT 5) group by p.name, p.price, p.image, ROUND(p.price*(100-p.discount)/100), floor(p.rate)
    `);
    return rs;
  },
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
