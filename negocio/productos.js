import model from '../model/productos';
import PrimeraConexion from './singleton';

export const getProductos = async () => {
	return await model.getProductos();
};

export const getProductoById = async (id) => {
	return await model.getProductoById(id);
};

export const addProducto = async (item) => {
	await model.addProducto(item);
};

export const updateProducto = async (id, item) => {
	await model.updateProducto(id, item);
};

export const deleteProducto = async (id) => {
	return await model.deleteProducto(id);
};

export const obtenerHora = () => {
	return new PrimeraConexion().obtenerHora();
};
