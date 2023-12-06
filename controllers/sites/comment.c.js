const comment = require('../../models/comment')

class commentController {

    async showDialog(req, res) {
        try {
            res.render('test/testComment', { layout: false })
        } catch (error) {
            throw error
        }
    }


    async getAll(req, res) {
        try {
            let listComments = await comment.selectAllComment();
            return res.status(200).json({ listComments: listComments });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" })
        }
    }
    async getByProductId(req, res) {
        try {
            let id = req.params.id;
            let listComments = await comment.getCommentByProductId(id);
            return res.status(200).json({ listComments: listComments })
        } catch (error) {
            return res.status(500).json({ error: "Server error" })
        }
    }
    async insertComment(req, res) {
        try {
            console.log(req.query);
            const { productId, userId, content, rate, date } = req.query;

            let commentId = await comment.getSelectMaxId() + 1;
            // console.log(commentId);
            let cmt = new comment(commentId, productId, userId, content, date, rate)
            let rs = await comment.insertComment(cmt);
            return res.status(200).json({ msg: "Insert Successfully !!!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error 1" })
        }
    }



}
module.exports = new commentController;
