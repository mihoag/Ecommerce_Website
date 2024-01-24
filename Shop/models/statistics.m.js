const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getTodayRevenue: async function () {
    try {
      data = await db.one(
        `
        select SUM(ROUND(p.price * (100-p.discount)/100) * quantity) from "OrderDetail" d, "Product" p, "Order" o where d."productId" = p."productId" and o."orderId" = d."orderId" and CURRENT_DATE=o."timeOrder"
        `
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  getMonthRevenue: async function () {
    try {
      data = await db.one(
        `
        select SUM(ROUND(p.price * (100-p.discount)/100) * quantity) from "OrderDetail" d, "Product" p, "Order" o where d."productId" = p."productId" and o."orderId" = d."orderId"
        and date_part('month', o."timeOrder") = date_part('month',CURRENT_DATE) and date_part('year', o."timeOrder") = date_part('year',CURRENT_DATE)
        `
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  getTop5: async function (time) {
    try {
      let bonusSql = '';
      if (time) bonusSql += `and date_part('year', o."timeOrder") = ${time}`
      const data = await db.any(`
      select p."name", SUM(d."quantity") as quantity from "OrderDetail" d, "Product" p, "Order" o where d."productId" = p."productId" and o."orderId" = d."orderId" ${bonusSql} group by p."productId", p."name" order by SUM(d."quantity") desc limit 5
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