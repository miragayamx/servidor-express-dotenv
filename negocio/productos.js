const model = require('../model/productos');

const getProductos = async () => {
	return await model.getProductos();
};

const getProductoById = async (id) => {
	return await model.getProductoById(id);
};

const addProducto = async (item) => {
	await model.addProducto(item);
};

const updateProducto = async (id, item) => {
	await model.updateProducto(id, item);
};

const deleteProducto = async (id) => {
	return await model.deleteProducto(id);
};

module.exports = {
	getProductos,
	getProductoById,
	addProducto,
	updateProducto,
	deleteProducto
};
