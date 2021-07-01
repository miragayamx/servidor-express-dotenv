const accountSid = 'AC061442e23b3e330a2d9e935999b94ff9';
const authToken = '7d4384781a66eaa9660a6a31e840fe31';
const logger = require('../winstonConfig');

const client = require('twilio')(accountSid, authToken);

const sendSMS = ({ message = 'Hola soy un SMS', phone }) => {
	client.messages
		.create({
			body: message,
			from: '+1 571 789 1332',
			to: phone
		})
		.then((message) => logger.info(message.sid))
		.catch((err) => {
			logger.info(err);
			logger.error(err);
		});
};

module.exports = sendSMS;
