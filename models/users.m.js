const { pgp, db } = require("../configs/DBconnection");

module.exports = {
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
    const rs = await db.one(
      'INSERT INTO "User"("name","phoneNumber","email","password", "avatar", "public_id", "gender") VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
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
};
