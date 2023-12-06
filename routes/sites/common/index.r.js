const express = require("express");
const router = express.Router();
const indexController = require('../../../controllers/sites/common/index.c');


router.get('/', indexController.showIndex);
module.exports = router;