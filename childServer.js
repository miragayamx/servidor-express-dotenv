const fServerOn = require('./fServerOn');
const logger = require('./winstonConfig');

process.on('message', (msg) => {
	logger.info(msg);
	fServerOn(8081);
});
