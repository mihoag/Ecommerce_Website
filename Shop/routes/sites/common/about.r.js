const express = require("express");
const router = express.Router();
const aboutController = require('../../../controllers/sites/common/about.c');


router.get('/', aboutController.showAbout);
module.exports = router;