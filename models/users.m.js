const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getUser: async () => {
    const rs = await db.any(`SELECT u.*, sum(o."totalCost") as total FROM "User" u, "Order" o where role = 'user' and u."userId" = o."userId" group by u."userId" order by u.name`);
    return rs;
  },
  getUserSearch: async (keyword) => {
    const rs = await db.any(`SELECT u.*, sum(o."totalCost") as total FROM "User" u, "Order" o where (u.name ilike '%${keyword}%' or u."phoneNumber" ilike '%${keyword}%') and role = 'user' and u."userId" = o."userId" group by u."userId" order by u.name`);
    return rs;
  },
  getAll: async () => {
    const rs = await db.any('SELECT * FROM "User"');
    return rs;
  },
  getByEmail: async (data) => {
    const rs = db.any('SELECT * FROM "User" WHERE "email"=$1', [data]);
    return rs;
  },
  getByID: async (ID) => {
    const rs = db.any('SELECT * FROM "User" WHERE "userId"=$1', [ID]);
    return rs;
  },
  add: async (data) => {
    let ID = await db.one('SELECT MAX("userId") FROM "User"');
    ID = ID.max + 1;
    const rs = await db.one(
      'INSERT INTO "User"("userId", "name","phoneNumber","email","password", "avatar", "public_id", "gender") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        ID,
        data.name,
        data.phoneNumber,
        data.email,
        data.password,
        data.avatar,
        data.public_id,
        data.gender,
      ]
    );
    return rs;
  },
  updateActiveAccount: async (id) => {
    const rs = await db.one(
      'UPDATE "User" SET "active"=true WHERE "userId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
  update: async (data) => {
    const rs = await db.one(
      'UPDATE "User" SET "name"=$1, "phoneNumber"=$2, "avatar"=$3, "public_id"=$4  WHERE "userId"=$5 RETURNING *',
      [data.name, data.phoneNumber, data.avatar, data.public_id, data.userId]
    );
    return rs;
  },
  delete: async (id) => {
    const rs = await db.one(
      'DELETE FROM "User" WHERE "userId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
  changePass: async (id, password) => {
    const rs = await db.one(
      'UPDATE "User" SET "password"=$1 WHERE "userId"=$2 RETURNING *',
      [password, id]
    );
    return rs;
  },
};
