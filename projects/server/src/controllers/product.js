const { WarehouseModel, ProductModel, StocksModel } = require("../model");
const { Op } = require("sequelize");

module.exports = {
  getDataProducts: async (req, res) => {
    try {
      let data = await ProductModel.findAll();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getDetailProducts: async (req, res) => {
    try {
      let { id_product } = req.query;
      let data = await ProductModel.findAll({
        where: {
          id_product,
        },
      });
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  editProducts: async (req, res) => {
    try {
      let { id_product, name, description, price, weight } = req.body;
      let data = await ProductModel.findAll({
        where: {
          [Op.or]: [{ name }],
        },
      });
      if (data.length > 1) {
        res.status(400).send({
          success: false,
          msg: "Name already registered",
        });
      } else {
        let editProd = await ProductModel.update(
          { name, description, price, weight },
          {
            where: { id_product },
          }
        );
      }
      res.status(200).send({
        success: true,
        msg: "Edit Data Success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  newProducts: async (req, res) => {
    try {
      let { name, description, price, weight } = req.body;
      let data = await ProductModel.findAll({
        where: {
          [Op.or]: [{ name }],
        },
      });
      if (data.length > 0) {
        res.status(400).send({
          success: false,
          msg: "Name already registered",
        });
      } else {
        let results = await ProductModel.create({
          name,
          description,
          price,
          weight,
        });

        let getWarehouse = await WarehouseModel.findAll();
        let warehouse = getWarehouse;

        warehouse.map((val, idx) => {
          let newStock = StocksModel.create({
            id_warehouse: val.dataValues.id_warehouse,
            id_product: results.id_product,
            stock: 0,
          });
        });
        res.status(200).send({
          success: true,
          msg: "Add Product Success",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
