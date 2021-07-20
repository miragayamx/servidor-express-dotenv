import express from 'express';
import handlebars from 'express-handlebars';
import logger from './winstonConfig';
import productRouter from './routes/productRouter';
import { createUploadsFolder} from './utils/fileManager';

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

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
	logger.info(`El servidor esta corriendo en el puerto: ${server.address().port}`);
    await createUploadsFolder();
});

server.on('error', (err) => {
	logger.info(`Error de servidor: ${err}`);
	logger.error(`Error de servidor: ${err}`);
});
