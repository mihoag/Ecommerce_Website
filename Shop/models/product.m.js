const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  countProducts: async () => {
    try {
      const rs = await db.one(`select SUM(total) from "Product"`)
      return rs;
    } catch (error) {
      throw error;
    }
  },
  getDataTypeById: async (typeId) => {
    try {
      const rs = await db.any(`
        SELECT SUM(d."quantity"), date_part('month', o."timeOrder") as month from "Order" o, "OrderDetail" d, "Product" p WHERE
        p."typeId" = $1 and p."productId" = d."productId" and o."orderId" = d."orderId" and date_part('year', o."timeOrder") = 2023 GROUP BY date_part('month', o."timeOrder")
      `, [typeId])
      return rs;
    } catch (error) {
      throw error;
    }
  },
  getMoreInfo: async () => {
    const rs = await db.any(
      'select p."productId", p."name" , p.price, p.cost, p.image, p."typeId",  avg((100-p.discount)*p.price)/100 as giagiam, p.discount, p."active", p."releaseDate", p.total, t.name as type from "Product" p , "Type" t  where p."typeId" = t."typeId" group by p."productId", t.name'
    );
    return rs;
  },
  getAll: async () => {
    const rs = await db.any(
      'select p."productId", p."name" , p."price", p."image", p."active", p."discount",  avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p , "Comment" c where p."productId" = c."productId" group by p."productId", p.price'
    );
    return rs;
  },
  getByID: async (ID) => {
    const rs = db.one(
      'select p."productId", p."name" , p.price, p.image, p."typeId", p."releaseDate", p."discount", p."total", p."cost" ,p."active", avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia, dp.* from "Product" p LEFT join  "Comment" c on p."productId" = c."productId", "ProductDetail" dp where p."productId" = dp."productId" and p."productId" = $1 group by p."productId", p.price , dp."productId",dp."screen",dp."os",dp."cameraBehind",dp."cameraFront",dp."cpu", dp."ram", dp."rom", dp."battery", dp."sim"',
      [ID]
    );
    return rs;
  },
  add: async (data) => {
    const idResult = await db.one('SELECT MAX("productId") FROM "Product"');
    const maxProductId = idResult.max || 0;
    const id = maxProductId + 1;
    const rs = await db.one(
      'INSERT INTO "Product"("productId", "name","total","typeId","image","public_id", "cost", "price", "discount", "releaseDate") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        id,
        data.name,
        data.total,
        data.typeId,
        data.image,
        data.public_id,
        data.cost,
        data.price,
        data.discount,
        data.releaseDate,
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
      'UPDATE "Product" SET "name"=$1, "total"=$2, "typeId"=$3, "image"=$4, "public_id"=$5, "cost"=$6, "price"=$7, "discount"=$8, "releaseDate"=$9  WHERE "productId"=$10 RETURNING *',
      [
        data.name,
        data.total,
        data.typeId,
        data.image,
        data.public_id,
        data.cost,
        data.price,
        data.discount,
        data.releaseDate,
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
  // top 5 san pham duoc danh gia cao nhat
  top5rated: async () => {
    const rs = await db.any(
      'select p."productId", p."name" , p.price, p.image,  avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId", p.price order by p.rate desc limit 5'
    );
    console.log(rs);
    return rs;
  },
  top5discount: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p.discount , p.price, p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId", p.price order by p.discount desc limit 5'
    );
    return rs;
  },
  top5modern: async () => {
    const rs = await db.any(
      'select p."productId", p."name" , p.price, p.image,  avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId", p.price  order by p.price desc limit 5'
    );
    return rs;
  },
  top5cheapest: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId"  group by p."productId"  order by p.price asc limit 5'
    );
    return rs;
  },
  top5newest: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p."releaseDate" , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId"  group by p."productId", p.price order by p."releaseDate" desc limit 5'
    );
    return rs;
  },
  getproductPerpage: async (limit, offset) => {
    const rs = await db.any(
      `select p."productId", p."name", p."releaseDate" , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId"  group by p."productId", p.price  limit ${limit} offset ${offset}`
    );
    return rs;
  },
  getProductByCate: async (id) => {
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" where "typeId" = $1  group by p."productId"  limit 10`,
      id
    );
    return rs;
  },
  selectProductByNameandCate: async (keyword) => {
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId", "Type" t  where t."typeId" = p."typeId" and (p."name" ilike '%` +
      keyword +
      `%' or t."name" ilike '%` +
      keyword +
      `%' ) group by p."productId"`
    );
    return rs;
  },
  getSearchMoreInfo: async (keyword) => {
    const rs = await db.any(
      `select p."productId", p."name" , p.price, p.cost, p.image,  avg((100-p.discount)*p.price)/100 as giagiam, p.discount, p."releaseDate", p.total, t.name as type from "Product" p , "Type" t  where p."typeId" = t."typeId" and (p."name" ilike '%${keyword}%' or t."name" ilike '%${keyword}%') group by p."productId", t.name`
    );
    return rs;
  },
  getProductByType: async (name) => {
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" LEFT join "Type" t on p."typeId" = t."typeId" where t."name" = '${name}' group by p."productId"`
    );
    return rs;
  },
  getProductByCost: async (begin, end) => {
    if (end == 0) {
      const maxDiscountedPrice = await db.one(
        `SELECT MAX((100 - p.discount) * p.price) / 100 AS "maxDiscountedPrice"
          FROM "Product" p`
      );
      end = maxDiscountedPrice.maxDiscountedPrice;
      //console.log(end);
    }
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId" having avg((100 - p.discount) * p.price) / 100 between ${begin} and ${end}`
    );
    return rs;
  },
  getProductByStar: async (star) => {
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId" having floor(avg(c.rate)) = ${star}`
    );
    return rs;
  },
  getProductAsc: async (filter) => {
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId" order by ${filter} asc`
    );
    return rs;
  },
  getProductDesc: async (filter) => {
    const rs = await db.any(
      `select p."productId", p."name", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId" order by ${filter} desc`
    );
    return rs;
  },
  getProductRated: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p."discount", p."typeId", p."releaseDate" , p.price, p.image,  avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId", p.price  order by p.rate desc'
    );
    return rs;
  },
  getProductDiscount: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p."discount", p."typeId", p."releaseDate", p.discount , p.price, p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId", p.price order by p.discount desc'
    );
    return rs;
  },
  getProductModern: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p."discount", p."typeId", p."releaseDate" , p.price, p.image,  avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia from "Product" p LEFT join  "Comment" c on p."productId" = c."productId" group by p."productId", p.price  order by p.price desc'
    );
    return rs;
  },
  getProductCheapest: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p."discount", p."typeId", p."releaseDate", p.discount , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId"  group by p."productId"  order by p.price asc'
    );
    return rs;
  },
  getProductNewest: async () => {
    const rs = await db.any(
      'select p."productId", p."name", p."discount", p."typeId", p."releaseDate", p."releaseDate" , p.price,p.image, avg((100-p.discount)*p.price)/100 as giagiam , floor(avg(c.rate)) as tb, count(*) as danhgia  from "Product" p LEFT join  "Comment" c on p."productId" = c."productId"  group by p."productId", p.price order by p."releaseDate" desc'
    );
    return rs;
  },

  updateAmount: async (IDproduct, ammount) => {
    await db.oneOrNone(`update "Product" set total = total - ${ammount}  where "productId" = $1`, [IDproduct])
  },
  updateAmount1: async (IDproduct, ammount) => {
    await db.oneOrNone(`update "Product" set total = total + ${ammount}  where "productId" = $1`, [IDproduct])
  },
};
