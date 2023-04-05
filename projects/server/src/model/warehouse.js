const { Sequelize } = require("sequelize");
const { dbSequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const WarehouseModel = dbSequelize.define(
  "warehouses",
  {
    id_warehouse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    warehouse_branch_name: {
      type: DataTypes.STRING,
    },
    postal_code: {
      type: DataTypes.INTEGER,
    },
    detail_address: {
      type: DataTypes.STRING,
    },
    coordinate_lat: {
      type: DataTypes.STRING,
    },
    coordinate_long: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = WarehouseModel;
