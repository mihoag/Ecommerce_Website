const productM = require('../../models/product.m')
class indexController {
    async showIndex(req, res, next) {
        try {
            let idUser = req.session.uid;
            // console.log(idUser);
            let top5rated = await productM.top5rated();
            let top5newest = await productM.top5newest();
            let top5discount = await productM.top5discount();
            let top5cheapest = await productM.top5cheapest();
            let top5modern = await productM.top5modern();

            //console.log(req.session.token)
            //console.log(top5newest, top5cheapest, top5discount, top5rated);
            res.render("common/index", { userId: idUser, top5rated: top5rated, top5newest: top5newest, top5discount: top5discount, top5cheapest: top5cheapest, top5modern: top5modern, token: req.session.token, title: "Trang chủ" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new indexController();