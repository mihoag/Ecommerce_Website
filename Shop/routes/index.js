const authMiddleware = require(".././middlewares/auth.mws");

function route(app) {
  require("../middlewares/passport.mws")(app);
  // Admin routes
  app.use('/admin', require('./admin/admin.r'))
  // Order routes
  app.use('/order', require('./sites/order.r'));
  // Order Detail routes
  app.use('/orderDetail', require('./sites/orderDetail.r'));
  // Comments routes
  app.use('/comment', require('./sites/comment.r'));
  //Slide routes
  app.use('/slide', require('./sites/slide.r'));
  // user routes
  app.use("/user", require("./sites/home.r"));
  app.use("/auth", require("./sites/auth.r"));
  // type routes
  app.use("/type", require("./sites/type.r"));
  // product routes
  app.use("/product", require("./sites/product.r"));
  // detail User routes
  app.use("/detailUser", require('./sites/detailUser.r'));
  // cart routes
  app.use("/cart", authMiddleware.mustLogin, require("./sites/cart.r"));


  app.use("/news", require('./common/news.r'));
  app.use("/contact", require('./common/contact.r'));
  app.use("/hiring", require('./common/hiring.r'));
  app.use("/maintenance", require('./common/maintenance.r'));
  app.use("/about", require('./common/about.r'));
  app.use("/login", require('./common/login.r'));
  app.use("/signup", require('./common/signup.r'))
  app.use("/showall", require('./common/showallProduct.r'))
  app.use("/", require('./common/index.r'));

  app.use((req, res, next) => {
    res.render("error/404", { layout: false });
  });
}

module.exports = route;
