require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DB,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PW,
  max: 30, // use up to 30 connections
};
