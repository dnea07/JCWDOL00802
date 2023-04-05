const express = require("express");
const { stockController } = require("../controllers");
const route = express.Router();

route.get("/stockwarehouse", stockController.getDataStockWarehouse);
route.get("/stockdetail", stockController.getDataStockWarehouseProduct);
route.get("/stockall", stockController.getDataStockAll);
route.post("/stockadd", stockController.addStock);
route.post("/stocksubtract", stockController.subtractStock);
route.post("/stockmove", stockController.moveStock);
route.post("/stockedit", stockController.editStock);

module.exports = route;
