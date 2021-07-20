class MemoryPersist {
	constructor() {
		this.productos = [];
	}
	getProductos = async () => {
		try {
			return this.productos;
		} catch (err) {
			throw err;
		}
	};
	getProductoById = async (id) => {
		try {
			return this.productos.filter((item) => item.id === id);
		} catch (err) {
			throw err;
		}
	};
	addProducto = async (item) => {
		try {
			const newProducto = {
				id: this.productos[this.productos.length - 1].id + 1,
				...item
			};
			this.productos.push(newProducto);
		} catch (error) {
			throw err;
		}
	};
	updateProducto = async (id, item) => {
		try {
			this.productos[id] = {
				...this.productos[id],
				...item
			};
		} catch (err) {
			throw err;
		}
	};
	deleteProducto = async (id) => {
		try {
			const index = this.productos.findIndex((item) => item.id === id);
			this.productos.splice(index, 1);
		} catch (err) {
			throw err;
		}
	};
}

export default MemoryPersist;
