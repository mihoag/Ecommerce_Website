const express = require("express");
const router = express.Router();
const showallController = require('../../controllers/common/showall.c');


router.get('/', showallController.showall);
module.exports = router;