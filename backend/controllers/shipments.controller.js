const { Shipment } = require("../models/shipment-record.model");
const { Product } = require("./../models/product.model");
const { sequelize } = require("../db");

exports.getAll = async (req, res, next) => {
  try {
    const shipments = await Shipment.findAll({
      include: [{ model: Product, as: "product" }],
    });
    res.status(200).json(shipments);
  } catch (error) {
    console.error("Error in getAll:", error);
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shipment = await Shipment.findByPk(id, { include: [Product] });
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.status(200).json(shipment);
  } catch (error) {
    console.error("Error in getById:", error);
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { productId, quantity, status } = req.body;

    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "Insufficient quantity in stock" });
    }

    product.quantity -= quantity;
    await product.save({ transaction: t });

    const newShipment = await Shipment.create(
      {
        productId,
        quantity,
        status: status || "created",
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json(newShipment);
  } catch (error) {
    await t.rollback();
    console.error("Error in create:", error);
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const shipment = await Shipment.findByPk(id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    await shipment.update({ status });
    res.status(200).json(shipment);
  } catch (error) {
    console.error("Error in updateStatus:", error);
    next(error);
  }
};
