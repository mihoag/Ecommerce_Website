const express = require("express");
const router = express.Router();
const slideController = require('../../controllers/sites/slide.c');


router.get('/show', slideController.showSlide);
router.post('/insert', slideController.insertSlide)
router.post('/update', slideController.updateSlide)
router.delete('/:id', slideController.deleteSlide);
router.get('/:id', slideController.getById)
router.get('/', slideController.getAll)

module.exports = router;