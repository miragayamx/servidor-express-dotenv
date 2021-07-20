import fs from 'fs';
import logger from '../winstonConfig.js';

export const createUploadsFolder = () => {
	fs.promises.mkdir('./public/uploads').then(() => logger.info('Directorio uploads creado!')).catch((err) => {
		if (err.code === 'EEXIST') return logger.info('Directorio uploads creado!');
		logger.info(err);
		logger.error(err);
	});
};

export const createFolder = async (path) => {
	fs.promises.mkdir(path).then(() => 'Directorio creado con exito!').catch((err) => {
		if (err.code === 'EEXIST') return;
		logger.info(err);
		logger.error(err);
	});
};

export const readFile = async (file) => {
	try {
		return await fs.promises.readFile(file, 'utf-8');
	} catch (err) {
		throw err;
	}
};

export const saveFile = async (file, data) => {
	try {
		await fs.promises.writeFile(file, data);
	} catch (err) {
		throw err;
	}
};

export const appendFile = async (file, data = '') => {
	try {
		await fs.promises.appendFile(file, data);
	} catch (err) {
		throw err;
	}
};

export const deleteFile = async (file) => {
	try {
		await fs.promises.unlink(file);
	} catch (err) {
		throw err;
	}
};
