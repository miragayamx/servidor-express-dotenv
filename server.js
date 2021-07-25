const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const logger = require('./winstonConfig');
const productRouter = require('./routes/productRouter');
const vistaRouter = require('./routes/vistaRouter');
const { createUploadsFolder } = require('./utils/fileManager');
const env = require('./config');

const argv = yargs(hideBin(process.argv)).argv

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		defaultLayout: 'index',
		layoutsDir: path.join(__dirname, '/views/layouts'),
		partialsDir: path.join(__dirname, '/views/partials')
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', vistaRouter);
app.use('/api', productRouter);

const PORT = argv.port || env.PORT;

const server = app.listen(PORT, async () => {
	logger.info(`El servidor esta corriendo en el puerto: ${server.address().port}`);
	await createUploadsFolder();
});

server.on('error', (err) => {
	logger.info(`Error de servidor: ${err}`);
	logger.error(`Error de servidor: ${err}`);
});
