const productM = require('../../models/product.m')
const productL = require('../../models/productsList.m')
const userModel = require('../../models/users.m')
class indexController {
    async showIndex(req, res, next) {
        try {
            let idUser = req.session.uid || req.session.passport?.user?.userId;
            if (req.session.passport) {
                req.session.token = req.session.passport?.user?.token
            }
            // console.log(idUser);
            // let top5rated = await productM.top5rated();
            // let top5newest = await productM.top5newest();
            // let top5discount = await productM.top5discount();
            // let top5cheapest = await productM.top5cheapest();
            // let top5modern = await productM.top5modern();
            let listproducts = await productL.getAll();
            let user = await userModel.getByID(idUser);
            //console.log(req.session.token)
            //console.log(top5newest, top5cheapest, top5discount, top5rated);
            res.render("common/index", { userId: idUser, listproducts: listproducts, token: req.session.token, title: "Trang chủ", fullname: user[0].name, email: user[0].email });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new indexController();