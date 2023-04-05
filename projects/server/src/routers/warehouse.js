const express = require("express");
const { warehouseController } = require("../controllers");
const route = express.Router();

route.get("/list", warehouseController.getDataWarehouse);
route.post("/addwarehouse", warehouseController.addWarehouse);
route.post("/editwarehouse", warehouseController.editWarehouse);
route.post("/deletewarehouse", warehouseController.deleteWarehouse);

module.exports = route;
