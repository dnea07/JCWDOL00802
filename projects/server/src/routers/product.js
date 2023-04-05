const express = require("express");
const { productController } = require("../controllers");
// const { readToken } = require("../config/encript");
const route = express.Router();

route.get("/list", productController.getDataProducts);
route.get("/detailproduct", productController.getDetailProducts);
route.post("/editproduct", productController.editProducts);
route.post("/addproduct", productController.newProducts);
//APLOD GAMBAR
// route.patch(
//   "/picture",
//   readToken,
//   uploader("/imgProduct", "IMGPRODUCT").array("images", 1),
//   productController.profileImg
// );

module.exports = route;
