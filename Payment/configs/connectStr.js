require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST1 || "localhost",
  port: process.env.DB_PORT1 || 5432,
  database: process.env.DB_DB1,
  user: process.env.DB_USER1 || "postgres",
  password: process.env.DB_PW1,
  max: 30, // use up to 30 connections
};

