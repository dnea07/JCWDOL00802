const { Sequelize } = require("sequelize");
const { dbSequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const WarehouseMutationModel = dbSequelize.define(
  "warehouse_mutations",
  {
    id_mutation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    id_warehouse_sender: {
      type: DataTypes.INTEGER,
    },
    id_warehouse_reciever: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE(0),
    },
    total_item: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = WarehouseMutationModel;
