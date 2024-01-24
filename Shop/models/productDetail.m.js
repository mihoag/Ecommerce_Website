const { pgp, db } = require("../configs/DBconnection");
module.exports = {
  add: async (data) => {
    const rs = await db.one(
      'INSERT INTO "ProductDetail"("productId","screen","os","cameraBehind","cameraFront", "ram", "rom", "battery") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        data.productId,
        data.screen,
        data.os,
        data.bcam,
        data.fcam,
        data.ram,
        data.rom,
        data.battery,
      ]
    );
    return rs;
  },

  update: async (data) => {
    const rs = await db.one(
      'UPDATE "ProductDetail" SET "screen"=$1, "os"=$2, "cameraBehind"=$3, "cameraFront"=$4, "ram"=$5, "rom"=$6, "battery"=$7, "cpu"=$8  WHERE "productId"=$9 RETURNING *',
      [
          data.screen,
          data.os,
          data.bcam,
          data.fcam,
          data.ram,
          data.rom,
          data.battery,
          data.cpu,
          data.productId,
      ]
    );
    return rs;
  },
  delete: async (id) => {
    const rs = await db.one(
      'DELETE FROM "ProductDetail" WHERE "productId"=$1 RETURNING *',
      [id]
    );
    return rs;
  },
};
