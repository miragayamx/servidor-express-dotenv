const path = require('path');
const logger = require('../winstonConfig');
const { readFile } = require('../utils/fileManager');

const getInfo = async (req, res) => {
	try {
        const pathFile = path.join(__dirname, '../artillery.txt');
		await readFile(pathFile);
		res.status(200).sendFile(pathFile);
	} catch (err) {
		if (err.code === 'ENOENT')
			return res.status(200).json({
				message: `Debe correr el siguiente comando para generar el archivo: artillery quick --count 10 -n 50 "http:/localhost:8081/randoms?cant=100\" > artillery.txt`
			});
		logger.error(`Error: ${err.message}`);
	}
};

module.exports = {
	getInfo
};
