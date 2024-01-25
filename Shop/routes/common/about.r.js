const express = require("express");
const router = express.Router();
const aboutController = require('../../controllers/common/about.c');


router.get('/', aboutController.showAbout);
module.exports = router;