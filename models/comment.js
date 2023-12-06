const db = require('../db/db')

module.exports = class comment {
    constructor(commentId, productid, userid, content, date, rate) {
        this.commentId = commentId
        this.productId = productid
        this.userId = userid
        this.content = content
        this.date = date
        this.rate = rate
    }

    static async selectAllComment() {
        try {
            let data = await db.selectAll("Comment");
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async insertComment(comment) {
        try {
            let data = await db.insert("Comment", comment);

            return data;
        } catch (error) {
            throw error
        }
    }
    static async getCommentByProductId(id) {
        try {
            let data = await db.selectJoinTable("Comment", "User", "userId", "userId", "productId", id)
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async getSelectMaxId() {
        try {
            let data = await db.selectMax("Comment", "commentId");
            console.log(data);
            if (!data.max) {
                return 1000;
            }
            return data.max;
        } catch (error) {
            throw error;
        }
    }
}

