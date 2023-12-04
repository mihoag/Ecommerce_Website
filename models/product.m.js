const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getAll: async () => {
    const rs = await db.any('SELECT * FROM "Product"');
    return rs;
  },
  getByID: async (ID) => {
    const rs = db.one('SELECT * FROM "Product" WHERE "productId"=$1', [ID]);
    return rs;
  },
  add: async (data) => {
    const rs = await db.one(
      'INSERT INTO "Product"("name","quantity","typeId","image","public_id", "cost", "price") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        data.name,
        data.quantity,
        data.typeId,
        data.image,
        data.public_id,
        data.cost,
        data.price,
      ]
    );
    return rs;
  },
  updateActiveProduct: async (id) => {
    const rs = await db.one(
      'UPDATE "Product" SET "active"=false WHERE "productId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
  update: async (data) => {
    const rs = await db.one(
      'UPDATE "Product" SET "name"=$1, "quantity"=$2, "typeId"=$3, "image"=$4, "public_id"=$5, "cost"=$6, "price"=$7  WHERE "productId"=$8 RETURNING *',
      [
        data.name,
        data.quantity,
        data.typeId,
        data.image,
        data.public_id,
        data.cost,
        data.price,
        data.productId,
      ]
    );
    return rs;
  },
  delete: async (id) => {
    const rs = await db.one(
      'DELETE FROM "Product" WHERE "productId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
};
