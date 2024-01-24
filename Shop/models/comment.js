const db = require('../db/db')

module.exports = class comment {
    constructor(commentId, productid, content, date, rate, name) {
        this.commentId = commentId
        this.productId = productid
        this.content = content
        this.date = date
        this.rate = rate
        this.name = name
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
            let data = await db.selectByOneField("Comment", "productId", id);
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

