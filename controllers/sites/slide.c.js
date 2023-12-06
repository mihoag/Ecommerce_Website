const slide = require('../../models/slide')
const upload = require('../../utils/multer')
const cloudinary = require('../../utils/cloudinary')


class slideController {

    async showSlide(req, res) {
        try {
            let listSlides = await slide.selectAllSlide();
            res.render("test/testSlide", { layout: false, listSlides: listSlides })
        } catch (error) {
            throw error
        }
    }

    async getAll(req, res) {
        try {
            let listSlides = await slide.selectAllSlide();
            return res.status(200).json({ listSlides: listSlides });
        } catch (error) {
            return res.status(500).json({ error: "Server error" })
        }
    }

    async getById(req, res) {
        try {
            let id = req.params.id;
            let data = await slide.getById(id);
            return res.status(200).json({ slide: data });
            // return data;
        } catch (error) {
            return res.status(500).json({ error: "Server error" })
        }
    }

    async insertSlide(req, res, next) {
        try {
            upload.single('myImage')(req, res, err => {
                if (err) throw err;
                const imageFile = req.file;
                //console.log(imageFile);
                const { originalname, mimetype, buffer } = imageFile;

                /// console.log(originalname);
                //console.log(mimetype);
                //console.log(buffer);

                cloudinary.uploader.upload(req.file.path, async function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            msg: "Error"
                        })
                    }
                    //console.log(result);
                    const { public_id, secure_url } = result;
                    // console.log(req.body);
                    const { header, content } = req.body;
                    let id = await slide.selectMaxId() + 1;
                    console.log(id)
                    console.log(secure_url)
                    console.log(public_id)
                    console.log(header)
                    console.log(content)
                    let s = new slide(id, secure_url, public_id, header, content);
                    let data = slide.insertSlide(s);
                    res.redirect('/slide/show');
                })
            })
        } catch (error) {
            // return res.status(500).json({ error: "Server error" })
            next(error)
        }
    }
    async updateSlide(req, res) {
        try {

        } catch (error) {
            return res.status(500).json({ error: "Server error" })
        }
    }

    async deleteSlide(req, res) {
        try {
            let id = req.params.id;
            await cloudinary.uploader.destroy(id);
            let data = slide.deleteSlide(id);
            return res.status(200).json({ msg: "Delete Successfully" })
        } catch (error) {
            return res.status(500).json({ msg: "Server error" })
        }
    }


}
module.exports = new slideController;
