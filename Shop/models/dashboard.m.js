const { pgp, db } = require("../configs/DBconnection");
const DB = require("../db/db");

function handleTimeOrder(timeOrder) {
  const inputDate = new Date(timeOrder);
  const outputDate = inputDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return outputDate;
}

function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  let vndFormatted = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return vndFormatted;
}
module.exports = {
  getTodayProfit: async function () {
    const todaySale = await this.getTodaySale();
    const todayCost = (
      await db.one(`SELECT SUM(od."quantity"*p."cost") as "todayCost" FROM "Order" o 
      JOIN "OrderDetail" od ON o."orderId" = od."orderId"
      JOIN "Product" p ON od."productId" = p."productId" WHERE o."isPayment" = true
      AND o."timeOrder" >= CURRENT_DATE
      AND o."timeOrder" < CURRENT_DATE + INTERVAL '1 DAY'`)
    ).todayCost;
    return (
      parseInt(todaySale ? todaySale : 0) - parseInt(todayCost ? todayCost : 0)
    );
  },

  getTodaySale: async function () {
    const todaySale = (
      await db.one(`SELECT SUM(O."totalCost") as "todaySale" FROM "Order" o WHERE o."isPayment" = true
      AND o."timeOrder" >= CURRENT_DATE
      AND o."timeOrder" < CURRENT_DATE + INTERVAL '1 DAY'`)
    ).todaySale;
    return parseInt(todaySale ? todaySale : 0);
  },

  getTodayProduct: async function () {
    const todayProduct = (
      await db.one(`SELECT SUM(od."quantity") as "todayProduct" FROM "Order" o 
        JOIN "OrderDetail" od ON o."orderId" = od."orderId"
        WHERE o."isPayment" = true
        AND o."timeOrder" >= CURRENT_DATE
        AND o."timeOrder" < CURRENT_DATE + INTERVAL '1 DAY'`)
    ).todayProduct;
    return todayProduct ? todayProduct : 0;
  },

  getTodayOrder: async function () {
    const todayOrder = (
      await db.one(`SELECT COUNT(*) FROM "Order" o WHERE o."isPayment" = true AND o."timeOrder" >= CURRENT_DATE
      AND o."timeOrder" < CURRENT_DATE + INTERVAL '1 DAY'`)
    ).count;
    return todayOrder ? todayOrder : 0;
  },

  getOrderList: async function () {
    const orders = await db.any(
      `SELECT * FROM "Order" o JOIN "User" u ON o."userId" = u."userId" ORDER BY "timeOrder" DESC LIMIT 5`
    );
    for (const order of orders) {
      order.timeOrder = handleTimeOrder(order.timeOrder);
      order.totalCost = convertToVND(order.totalCost);
    }
    return orders;
  },
};
