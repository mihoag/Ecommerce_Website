const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getTop5: async function () {
    try {
      const data = await db.any(`
      select p."name", SUM(d."quantity") as quantity from "OrderDetail" d, "Product" p where d."productId" = p."productId" group by p."productId", p."name" order by SUM(d."quantity") desc limit 5
      `)
      return data;
    } catch (error) {
      throw error;
    }
  },

  getRevenueWeek: async function (from, to) {
    try {

      data = await db.any(
        `
        select SUM((ROUND(p.price * (100-p.discount)/100) - p.cost) * d.quantity) as profit, SUM(ROUND(p.price * (100-p.discount)/100) * quantity) as sum, extract('day' from o."timeOrder") as day from "Order" o, "OrderDetail" d, "Product" p where o."orderId" = d."orderId" and d."productId" = p."productId" and o."timeOrder">='${from}' and o."timeOrder"<= '${to}'  group by extract('day' from o."timeOrder")
        `
      );
      return data
    } catch (error) {
      throw error;
    }
  },

  getRevenue: async function (month, year) {
    try {
      const data = await db.any(`
      select SUM((ROUND(p.price * (100-p.discount)/100) - p.cost) * d.quantity) as profit, SUM(ROUND(p.price * (100-p.discount)/100) * quantity) as sum, extract('day' from o."timeOrder") as day from "Order" o, "OrderDetail" d, "Product" p where o."orderId" = d."orderId" and d."productId" = p."productId" and date_part('year', o."timeOrder") = ${year} and date_part('month', o."timeOrder") = ${month} group by extract('day' from o."timeOrder")
      `)
      return data;
    } catch (error) {
      throw error;
    }
  }
}