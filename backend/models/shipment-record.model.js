const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");
const { Product } = require("./product.model");

const Status = {
  Created: "created",
  Shipped: "shipped",
  Delivered: "delivered",
};

const Shipment = sequelize.define(
  "Shipment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(Status),
      allowNull: false,
      defaultValue: Status.Created,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "shipments",
    timestamps: false,
  }
);

Shipment.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = { Status, Shipment };
