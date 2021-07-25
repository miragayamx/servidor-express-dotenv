const negocio = require('../negocio/productos');
const { deleteFile } = require('../utils/fileManager');

//GET
const getAllProducts = async (req, res) => {
	try {
		const lista = await negocio.getProductos();
		res.status(200).json(lista);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};
const getProduct = async (req, res) => {
	try {
		const producto = await negocio.getProductoById(req.params.id);
		res.status(200).json(producto);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
//POST
const createProduct = async (req, res) => {
	try {
		const newProducto = {
			title: req.body.title,
			price: req.body.price,
			thumbnail: '/uploads/' + req.file.filename
		};
		await negocio.addProducto(newProducto);
		res.status(201).json(newProducto);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
//PUT
const updateProduct = async (req, res) => {
	try {
		const producto = await negocio.getProductoById(req.params.id);
		if (!!req.file) {
			req.body.thumbnail = '/uploads/' + req.file.filename;
			await deleteFile(`./public/${producto.thumbnail}`);
		}
		await negocio.updateProducto(req.params.id, req.body);
		const updatedProduct = await negocio.getProductoById(req.params.id);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
//DELETE
const deleteProduct = async (req, res) => {
	try {
		const producto = await negocio.getProductoById(req.params.id);
		if (producto.thumbnail.includes('uploads')) await deleteFile(`./public/${producto.thumbnail}`);
		await negocio.deleteProducto(producto._id);
		res.status(200).json(producto);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
};
