const memoryPersist = require('./memoryPersist');
const mongoPersist = require('./mongoPersist');
const logger = require('../winstonConfig');
const env = require('../config');

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductoModel {
	static set(opcion) {
		logger.info(`*** PERSISTENCIA SELECCIONADA **** [${opcion}]`);
		switch (opcion) {
			case 'Mem':
				return new memoryPersist();
			case 'Mongo':
				return new mongoPersist();
		}
	}
}

const opcion = env.PERSIST;

module.exports = FactoryProductoModel.set(opcion);
