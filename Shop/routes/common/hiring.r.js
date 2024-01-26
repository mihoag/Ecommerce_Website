const express = require("express");
const router = express.Router();
const hiringController = require('../../controllers/common/hiring.c');


router.get('/', hiringController.showHiring);
module.exports = router;