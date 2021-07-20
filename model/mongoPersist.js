import mongoose from 'mongoose'
import logger from '../winstonConfig';

const productoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true
	},
	thumbnail: {
		type: String,
        required: true,
		trim: true
	}
});

const Producto = mongoose.model('producto', productoSchema);

class MongoPersist {
	constructor() {
		(async () => {
			try {
				await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false,
					useCreateIndex: true
				});
				logger.info('Base de datos conectada');
			} catch (err) {
				logger.error(err);
			}
		})();
	}
	getProductos = async () => {
		try {
			return await Producto.find({}).lean();
		} catch (err) {
			throw err;
		}
	};
	getProductoById = async (id) => {
		try {
			return await await Producto.findById(id);
		} catch (err) {
			throw err;
		}
	};
	addProducto = async (item) => {
		try {
			const instance = new Producto(item);
			await instance.save();
		} catch (err) {
			throw err;
		}
	};
	updateProducto = async (id, item) => {
		try {
			await Producto.findByIdAndUpdate(id, item);
		} catch (err) {
			throw err;
		}
	};
	deleteProducto = async (id) => {
		try {
			await Producto.findByIdAndRemove(id);
		} catch (err) {
			throw err;
		}
	};
}

export default MongoPersist;
