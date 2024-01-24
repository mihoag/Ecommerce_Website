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

    async getPerpageByProductId(req, res, next) {
        try {
            let id = req.params.id;
            let listComments = await comment.getCommentByProductId(id);
            // console.log(data)
            let result = [];
            const per_page = 4;
            let totalPage = parseInt(parseInt(listComments.length) / parseInt(per_page));
            if (listComments.length % per_page != 0) {
                totalPage++;
            }

            let currentPage = req.query.currentPage;
            if (currentPage === undefined) {
                currentPage = 1;
            }
            let start = (currentPage - 1) * per_page;
            for (let i = start; i < start + per_page; i++) {
                if (i >= listComments.length) {
                    break;
                }
                result.push(listComments[i]);
            }
            /// Tao mot mang tu 1,2..., totalPae
            res.json({ listComments: result, totalPage: totalPage, currentPage: currentPage });
        } catch (error) {
            next(error);
        }
    }


    async insertComment(req, res) {
        try {
            console.log(req.query);
            const { name, productId, content, rate, date } = req.query;

            let commentId = await comment.getSelectMaxId() + 1;
            // console.log(commentId);
            let cmt = new comment(commentId, productId, content, date, rate, name)
            let rs = await comment.insertComment(cmt);
            return res.status(200).json({ msg: "Insert Successfully !!!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error 1" })
        }
    }



}
module.exports = new commentController;
