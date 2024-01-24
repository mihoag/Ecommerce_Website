const express = require("express");
const router = express.Router();
const newsController = require('../../../controllers/sites/common/new.c');


router.get('/', newsController.showNews);
module.exports = router;