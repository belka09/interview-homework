const { Sequelize, DataTypes } = require("sequelize");
const { faker } = require("@faker-js/faker");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "unit_price",
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("DB successfully created");

    const count = await Product.count();
    if (count === 0) {
      const products = [];
      for (let i = 1; i <= 50; i++) {
        products.push({
          imageUrl: faker.image.urlLoremFlickr({
            category: "products",
            width: 50,
            height: 50,
          }),
          name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
          description: faker.commerce.productDescription(),
          quantity: faker.number.int({ min: 1, max: 100 }),
          unitPrice: faker.commerce.price({ min: 10, max: 100 }),
        });
      }

      await Product.bulkCreate(products);
      console.log("50 products seeded");
    }
  })
  .catch((err) => console.error("DB creating error:", err));

module.exports = {
  sequelize,
  Product,
};
