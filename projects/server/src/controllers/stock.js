const StocksModel = require("../model/stock");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  getDataStockWarehouse: async (req, res) => {
    try {
      let { id_warehouse } = req.query;
      let data = await StocksModel.findAll({
        where: { id_warehouse },
      });
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getDataStockWarehouseProduct: async (req, res) => {
    try {
      let { id_warehouse, id_product } = req.query;
      let data = await StocksModel.findAll({
        where: { id_warehouse, id_product },
      });
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getDataStockAll: async (req, res) => {
    try {
      let data = await StocksModel.findAll();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  editStock: async (req, res) => {
    try {
      let { input, id_product, id_warehouse, type } = req.body;
      if (type == "increment") {
        let inputItem = await StocksModel.increment(
          { stock: input },
          {
            where: {
              [sequelize.Op.and]: [{ id_product }, { id_warehouse }],
            },
          }
        );
        res.status(200).send("done");
      } else if (type == "decrement") {
        let inputItem = await StocksModel.decrement(
          { stock: input },
          {
            where: {
              [sequelize.Op.and]: [{ id_product }, { id_warehouse }],
            },
          }
        );
        res.status(200).send("done");
      }
    } catch (error) {
      console.log(error);
    }
  },
  addStock: async (req, res) => {
    try {
      let { input, id_product, id_warehouse } = req.body;

      let inputItem = await StocksModel.increment(
        { stock: input },
        {
          where: {
            [sequelize.Op.and]: [{ id_product }, { id_warehouse }],
          },
        }
      );
      res.status(200).send("done");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  subtractStock: async (req, res) => {
    try {
      let { input, id_product, id_warehouse } = req.body;

      let inputItem = await StocksModel.decrement(
        { stock: input },
        {
          where: {
            [sequelize.Op.and]: [{ id_product }, { id_warehouse }],
          },
        }
      );
      res.status(200).send("done");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  moveStock: async (req, res) => {
    try {
      let { input, id_product, from_id_warehouse, to_id_warehouse } = req.body;

      let inputItem = await StocksModel.increment(
        { stock: input },
        {
          where: {
            [sequelize.Op.and]: [
              { id_product },
              { id_warehouse: to_id_warehouse },
            ],
          },
        }
      );
      let moveItem = await StocksModel.decrement(
        { stock: input },
        {
          where: {
            [sequelize.Op.and]: [
              { id_product },
              { id_warehouse: from_id_warehouse },
            ],
          },
        }
      );
      res.status(200).send("done");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
