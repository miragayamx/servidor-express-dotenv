const path = require('path');
const faker = require('faker');

const imageFile = path.join(__dirname, '../assets/BK-EXAGON-GREEN-1024x1024.png');

const get = () => ({
	title: faker.commerce.productName(),
	price: Number(faker.commerce.price()),
	thumbnail: imageFile
});

module.exports = {
	get
};
