const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelizeConnectData = {
	sqllite: {
		dialect: 'sqlite',
		storage: './BD.sqlite'
	}
};

class SqlPersist {
	constructor() {
		const sequelize = new Sequelize(connectData);
		this.productos = sequelize.define('Producto', {
			_id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false
			},
			thumbnail: {
				type: DataTypes.STRING,
				allowNull: false
			}
		});
        sequelize.sync();
	}
	getProductos = async () => {
		try {
			return await this.productos.findAll();
		} catch (err) {
			throw err;
		}
	};
	getProductoById = async (id) => {
		try {
			const item = await this.productos.findAll({
				where: {
					_id: {
						[Op.eq]: id
					}
				}
			});
			return item[0].dataValues;
		} catch (err) {
			throw err;
		}
	};
	addProducto = async (item) => {
		try {
			await this.productos.create(item);
		} catch (err) {
			throw err;
		}
	};
	updateProducto = async (id, item) => {
		try {
			await this.productos.update(item, {
				where: {
					_id: {
						[Op.eq]: id
					}
				}
			});
		} catch (err) {
			throw err;
		}
	};
	deleteProducto = async (id) => {
		try {
			await this.productos.destroy({
				where: {
					_id: {
						[Op.eq]: id
					}
				}
			});
		} catch (err) {
			throw err;
		}
	};
}

export default SqlPersist;
