function route(app) {
  // Admin routes
  app.use('/admin', require('./sites/admin/admin.r'))
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
  app.use("/cart", require("./sites/cart.r"));


  app.use("/news", require('./sites/common/news.r'));
  app.use("/contact", require('./sites/common/contact.r'));
  app.use("/hiring", require('./sites/common/hiring.r'));
  app.use("/maintenance", require('./sites/common/maintenance.r'));
  app.use("/about", require('./sites/common/about.r'));
  app.use("/login", require('./sites/common/login.r'));
  app.use("/signup", require('./sites/common/signup.r'))
  app.use("/detailProducts", require('./sites/common/detailProduct.r'));

  app.use("/", require('./sites/common/index.r'));
  app.use((req, res, next) => {
    res.render("error/404", { layout: false });
  });
}

module.exports = route;
