const express = require("express");
const router = express.Router();
const contactController = require('../../controllers/common/contact.c');


router.get('/', contactController.showContact);
router.post('/', contactController.sendEmail)
module.exports = router;