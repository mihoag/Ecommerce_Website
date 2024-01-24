const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getToken: async (token) => {
    const rs = db.any('SELECT * FROM "VerifyCode" WHERE "token"=$1', [token]);
    return rs;
  },
  add: async (token) => {
    const rs = await db.one(
      'INSERT INTO "VerifyCode" ("token") VALUES($1) RETURNING *',
      [token]
    );
    return rs;
  },
  delete: async (id) => {
    const rs = await db.none('DELETE FROM "VerifyCode" WHERE "codeId"=$1', [
      id,
    ]);
    return rs;
  },
};
