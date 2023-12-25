const express = require("express");
const router = express.Router();

const controller = require("../../controllers/sites/product.c");
const authMiddleware = require("../../middlewares/auth.mws");
const upload = require("../../utils/parseFile");

router.get("/all", controller.getAll);

// TODO: Delete this later
router.get("/create", controller.renderPage);
router.get("/update/:id", controller.renderPageUpdate);
// End TODO: Delete this later

router.post(
  "/create",
  upload.single("image"),
  authMiddleware.isAdmin,
  controller.add
);
router.post(
  "/update/:id",
  upload.single("image"),
  authMiddleware.isAdmin,
  controller.update
);
router.post("/delete/:id", authMiddleware.isAdmin, controller.delete);
// TODO: add auth middleware
router.get("/getPerpage", controller.getProductPerPage)
// END TODO
router.get("/detailProducts", authMiddleware.mustLogin, controller.showDetailProduct)
router.get("/searchproduct", controller.getSearchProductPerPage)
module.exports = router;
