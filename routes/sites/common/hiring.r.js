const express = require("express");
const router = express.Router();
const hiringController = require('../../../controllers/sites/common/hiring.c');


router.get('/', hiringController.showHiring);
module.exports = router;