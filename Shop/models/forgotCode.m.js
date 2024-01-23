const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getToken: async (code) => {
    const rs = db.any('SELECT * FROM "ForgotCode" WHERE "code"=$1', [code]);
    return rs;
  },
  add: async (code, userId) => {
    const rs = await db.one(
      'INSERT INTO "ForgotCode" ("code","userId") VALUES($1, $2) RETURNING *',
      [code, userId]
    );
    return rs;
  },
  delete: async (id) => {
    const rs = await db.any('DELETE FROM "ForgotCode" WHERE "userId"=$1', [id]);
    return rs;
  },
};
