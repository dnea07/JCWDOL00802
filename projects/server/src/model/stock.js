const { Sequelize } = require("sequelize");
const { dbSequelize } = require("../config/db");
const { DataTypes } = Sequelize;

// const ProductModel = require("./product");
// const WarehouseModel = require("./warehouse");

const StocksModel = dbSequelize.define(
  "stocks",
  {
    id_stock: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_warehouse: {
      type: DataTypes.INTEGER,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

// //relation to warehouse
// StocksModel.hasMany(WarehouseModel, {
//   foreignKey: "id_warehouse",
//   sourceKey: "id_warehouse",
// });
// WarehouseModel.belongsTo(StocksModel, {
//   foreignKey: "id_warehouse",
//   targetKey: "id_warehouse",
// });

// //relation to product
// StocksModel.hasMany(ProductModel, {
//   foreignKey: "id_product",
//   sourceKey: "id_product",
// });
// ProductModel.belongsTo(StocksModel, {
//   foreignKey: "id_product",
//   targetKey: "id_product",
// });

module.exports = StocksModel;
