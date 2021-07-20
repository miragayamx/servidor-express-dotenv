import { getProductoById } from '../negocio/productos.js';

const productExists = async (req, res, next) => {
	try {
		await getProductoById(req.params.id);
		next();
	} catch (err) {
		res.status(400).json({ error: 'producto no encontrado' });
	}
};

export default productExists;
