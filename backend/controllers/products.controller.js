const { Product } = require("../models/product.model");
const { Shipment } = require("../models/shipment-record.model");

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { isDeleted: false },
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, imageUrl, quantity, unitPrice } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      imageUrl,
      quantity,
      unitPrice,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, quantity, unitPrice } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({ name, description, imageUrl, quantity, unitPrice });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const countShipments = await Shipment.count({
      where: { productId: product.id },
    });

    if (countShipments === 0) {
      await product.destroy();
      return res.status(204).send();
    } else {
      if (!product.isDeleted) {
        product.isDeleted = true;
        await product.save();
      }
      return res.status(200).json({ message: "Product soft-deleted" });
    }
  } catch (error) {
    next(error);
  }
};
