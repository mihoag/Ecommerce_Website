const express = require("express");
const router = express.Router();
const showallController = require('../../../controllers/sites/common/showall.c');


router.get('/', showallController.showall);
module.exports = router;