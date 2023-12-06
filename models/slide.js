const db = require('../db/db')

module.exports = class slide {
    constructor(slideId, image, public_id, header, content) {
        this.slideId = slideId
        this.image = image
        this.public_id = public_id
        this.header = header
        this.content = content
    }

    static async selectAllSlide() {
        try {
            let data = await db.selectAll("Slide");
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async insertSlide(slide) {
        try {
            let data = await db.insert("Slide", slide);
            return data;
        } catch (error) {
            throw error
        }
    }
    static async deleteSlide(id) {
        try {
            let data = await db.delete("Slide", "public_id", id)
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async getSlideById(id) {
        try {
            let data = await db.selectByID("Slide", "slideId", id)
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async updateSlide(slide) {
        try {
            let data = await db.update("Slide", slide, "slideId", slide.id);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async selectMaxId() {
        try {
            let data = await db.selectMax("Slide", "slideId");
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

