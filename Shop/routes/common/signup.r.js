const express = require("express");
const router = express.Router();
const homeController = require('../../controllers/sites/home.c');


router.get('/', homeController.signUp);
module.exports = router;