const express = require("express");
const router = express.Router();
const commentController = require('../../controllers/sites/comment.c')


router.get('/show', commentController.showDialog)
router.get('/insert', commentController.insertComment)
router.get('/:id', commentController.getByProductId)

router.get('/', commentController.getAll)


module.exports = router;