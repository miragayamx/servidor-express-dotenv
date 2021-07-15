const faker = require("faker");

const get = () => ({
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  thumbnail: faker.image.technics(),
});

module.exports = {
  get,
};
