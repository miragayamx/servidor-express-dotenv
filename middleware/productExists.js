const { getProductoById } = require('../negocio/productos');

const productExists = async (req, res, next) => {
	try {
		await getProductoById(req.params.id);
		next();
	} catch (err) {
		res.status(400).json({ error: 'producto no encontrado' });
	}
};

module.exports = productExists;