import fs from 'fs';

class FileSystemPersist {
	constructor() {
		(async () => {
			try {
				await fs.promises.readFile('datos.txt');
			} catch (err) {
				await fs.promises.writeFile('datos.txt', JSON.stringify([]));
			}
		})();
	}
	getProductos = async () => {
		try {
			const datos = await fs.promises.readFile('datos.txt');
			return JSON.parse(datos);
		} catch (err) {
			throw err;
		}
	};
	getProductoById = async (id) => {
		try {
			const productos = JSON.parse(await fs.promises.readFile('datos.txt'));
			return productos.filter((item) => item.id === id);
		} catch (err) {
			throw err;
		}
	};
	addProducto = async (item) => {
		try {
			const productos = JSON.parse(await fs.promises.readFile('datos.txt'));
			const newProducto = {
				id: productos[productos.length - 1].id + 1,
				...item
			};
			productos.push(newProducto);
			await fs.promises.writeFile('datos.txt', JSON.stringify(productos));
		} catch (error) {
			throw err;
		}
	};
	updateProducto = async (id, item) => {
		try {
			let productos = JSON.parse(await fs.promises.readFile('datos.txt'));
			productos[id] = {
				...productos[id],
				...item
			};
			await fs.promises.writeFile('datos.txt', JSON.stringify(productos));
		} catch (err) {
			throw err;
		}
	};
	deleteProducto = async (id) => {
		try {
			const productos = JSON.parse(await fs.promises.readFile('datos.txt'));
			const newProductos = productos.filter((item) => item.id !== id);
			await fs.promises.writeFile('datos.txt', JSON.stringify(newProductos));
		} catch (err) {
			throw err;
		}
	};
}

export default FileSystemPersist;
