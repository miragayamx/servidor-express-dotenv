const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const env = {
	PORT: process.env.PORT,
	PERSIST: process.env.PERSIST
};

module.exports = env;
