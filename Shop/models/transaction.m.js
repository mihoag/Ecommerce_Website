const { pgp, db } = require("../configs/DBconnection");
require("dotenv").config();
const https = require("https");
const fetch = require("node-fetch");
const paymentURL = `https://localhost:${process.env.PORT_GD}`;
const pageSize = 20;
const User = require("./users.m");
async function getData(url) {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const response = await fetch(`${paymentURL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    agent: httpsAgent,
  });
  const data = await response.json();
  return data;
}

module.exports = {
  getPaymentTransactions: async function (pageNum=1, search, start, end) {
    const items = await getData("/api/get-payment-trans");
    let totalItems;
    let numberOfPages;
    for (const item of items) {
      var user = await User.getByEmail(item.username1);
      user = user[0];
      item.name = user.name;
    }
    const filteredItems = items.filter((item) => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(search?search.toLowerCase():'');
    });

    totalItems = filteredItems.length;
    numberOfPages = Math.ceil(totalItems / pageSize);
    const offset = (pageNum - 1) * pageSize;
    const trans = filteredItems.slice(offset, offset + pageSize);
    return { trans: trans, pages: numberOfPages, page: pageNum };
  },

  getAddMoneyTransactions: async function (pageNum=1, search, start, end) {
    const items = await getData("/api/get-add-trans");
    let totalItems;
    let numberOfPages;
    for (const item of items) {
      var user = await User.getByEmail(item.username);
      user = user[0];
      item.name = user.name;
    }
    const filteredItems = items.filter((item) => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(search?search.toLowerCase():'');
    });

    totalItems = filteredItems.length;
    numberOfPages = Math.ceil(totalItems / pageSize);
    const offset = (pageNum - 1) * pageSize;
    const trans = filteredItems.slice(offset, offset + pageSize);
    return { trans: trans, pages: numberOfPages, page: pageNum };
  },

  getAdminBalance: async function () {
    const data = await getData(
      `/api/get-admin-balance?admin=${process.env.email_admin}`
    );
    return data ? data : 0;
  },
};
