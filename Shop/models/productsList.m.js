const { pgp, db } = require("../configs/DBconnection");
const DB = require("../db/db");
const Product = require("../models/product.m");
module.exports = {
  add: async (data) => {
    const rs = await db.one(
      'INSERT INTO "ProductsList" ("name", "color1", "color2") VALUES($1, $2, $3) RETURNING *',
      [data.name, data.color1, data.color2]
    );
    await db.any(
      'UPDATE "ProductsList" SET "sortId"=$1 WHERE "listId"=$2',
      [rs.listId, rs.listId]
    );
    for (const item of data.items) {
      if (data.home.includes(item)) {
        await db.any(
          'INSERT INTO "ProductsListItems" ("listId", "productId", "home") VALUES($1, $2, true)',
          [rs.listId, item]
        );
      } else {
        await db.any(
          'INSERT INTO "ProductsListItems" ("listId", "productId") VALUES($1, $2)',
          [rs.listId, item]
        );
      }
    }
    return rs;
  },

  delete: async (id) => {
    const rs = await db.one(
      'SELECT * FROM "ProductsList" WHERE "listId" = $1',
      [id]
    );
    if (rs) {
      const lists = await db.any(
        'SELECT * FROM "ProductsList" WHERE "sortId">$1',
        [rs.sortId]
      );
      lists.forEach(async (list) => {
        list.sortId--;
        await DB.update("ProductsList", list, "listId", list.listId);
      });
      const items = await db.any(
        'SELECT * FROM "ProductsListItems" WHERE "listId" = $1',
        [rs.listId]
      );
      for (const item of items) {
        await DB.delete("ProductsListItems", "listId", rs.listId);
      }
      await DB.delete("ProductsList", "listId", rs.listId);
    }
    return rs;
  },

  update: async (data) => {
    const rs = await DB.update("ProductsList", {name: data.name, color1: data.color1, color2: data.color2}, "listId", data.listId);
    const items = await db.any(
      'SELECT * FROM "ProductsListItems" WHERE "listId" = $1',
      [rs.listId]
    );
    for (const item of items) {
      await DB.delete("ProductsListItems", "productId", item.productId);
    }
    for (const item of data.items) {
      if (data.home.includes(item)) {
        await db.any(
          'INSERT INTO "ProductsListItems" ("listId", "productId", "home") VALUES($1, $2, true)',
          [rs.listId, item]
        );
      } else {
        await db.any(
          'INSERT INTO "ProductsListItems" ("listId", "productId") VALUES($1, $2)',
          [rs.listId, item]
        );
      }
    }
    return rs;
  },

  getAll: async () => {
    const data = await db.any(
      'SELECT * FROM "ProductsList" ORDER BY "sortId" ASC'
    );
    for (const list of data) {
      list.home = [];
      const items = await db.any(
        'SELECT * FROM "ProductsListItems" WHERE "listId" = $1 AND "home" = true',
        [list.listId]
      );

      for (const item of items) {
        const dt = await Product.getByID(item.productId);
        list.home.push(dt);
      }
    }
    return data;
  },

  getSingleList: async (id) => {
    const data = await db.one(
      'SELECT * FROM "ProductsList" WHERE "listId" = $1',
      [id]
      );
    if(!data) {
      return null;
    }
    data.items = [];
    data.home = [];
    const items = await db.any(
      'SELECT * FROM "ProductsListItems" WHERE "listId" = $1',
      [data.listId]
    );
    for (const item of items) {
      const dt = await Product.getByID(item.productId);
      data.items.push(dt);
      if(item.home) {
        data.home.push(dt);
      }
    }
    return data;
  },

  getListItemsForUpdate: async (id) => {
    const data = await db.one(
      'SELECT * FROM "ProductsList" WHERE "listId" = $1',
      [id]
      );
    if(!data) {
      return null;
    }
    data.items = [];
    data.home = [];
    const items = await db.any(
      'SELECT * FROM "ProductsListItems" WHERE "listId" = $1',
      [data.listId]
    );
    for (const item of items) {
      data.items.push(item.productId);
      if(item.home) {
        data.home.push(item.productId);
      }
    }
    return data;
  },

  sort: async (data) => {
    await db.any('UPDATE "ProductsList" SET "sortId"=$1 WHERE "listId"=$2', [
      data.sort,
      data.listId,
    ]);
  },
};
