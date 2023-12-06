const express = require("express");
const router = express.Router();

const userdetailController = require("../../controllers/sites/detailUser.c");

router.get("/", userdetailController.showDetailUser)

module.exports = router;
