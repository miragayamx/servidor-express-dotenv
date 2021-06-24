const fServerOn = require('./fServerOn');
const logger = require('./winstonConfig');

const PORT = process.env.PORT || 8080;

process.on('message', (msg) => {
	logger.info(msg);
	fServerOn(PORT);
});
