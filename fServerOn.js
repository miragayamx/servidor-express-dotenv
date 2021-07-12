const path = require('path');
const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const logger = require('./winstonConfig');
const handlebars = require('express-handlebars');
const { graphqlHTTP } = require('express-graphql');
const upload = require('./middleware/multer');
const graphqlController = require('./graphql/graphqlController');
const productRouter = require('./routes/productRouter');
const vistaRouter = require('./routes/vistaRouter');
const loginRouter = require('./routes/loginRouter');
const infoRouter = require('./routes/infoRouter');
const randomsRouter = require('./routes/randomsRouter');
const artilleryRouter = require('./routes/artilleryRouter');
const Producto = require('./models/producto');
const Mensaje = require('./models/mensaje');
const { createUploadsFolder, createDBLiteFolder, readFile, saveFile, appendFile } = require('./utils/fileManager');
const sendSMS = require('./services/twilio');
require('dotenv').config();
require('./db/mongoose');
require('./passport/passport');

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URL,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
		}),
		secret: 'secreto',
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: { maxAge: process.env.SESSION_EXPIRATION }
	})
);

app.use(passport.initialize());
app.use(passport.session());

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(compression());

app.use('/', loginRouter);
app.use('/', infoRouter);
app.use('/', randomsRouter);
app.use('/', artilleryRouter);
app.use('/api', productRouter);
app.use('/productos', vistaRouter);

const imagePathCapture = (req, res, next) => {
	if (req.file) {
		const { title, price } = req.body;
		req.body.variables = {
			input: {
				title: title,
				price: Number(price),
				thumbnail: '/uploads/' + req.file.filename
			}
		};
	}
	next();
};

app.use(
	'/graphql',
	upload.single('thumbnail'),
	imagePathCapture,
	graphqlHTTP({
		schema: graphqlController.schema,
		rootValue: graphqlController.root,
		graphiql: true
	})
);

const fServerOn = (PORT) => {
	//SOCKET
	io.on('connection', (socket) => {
		//TABLA EN TIEMPO REAL
		socket.on('getUpdate', async () => {
			try {
				const lista = await Producto.find();
				if (!lista.length) throw Error();
				io.emit('update', { existe: true, lista: lista });
			} catch (err) {
				io.emit('update', { existe: false, lista: lista });
			}
		});
		//CHAT
		(async () => {})();
		socket.on('getChatMessages', async () => {
			try {
				const messages = await Mensaje.find();
				if (!messages.length) throw new Error('ENOENT');
				io.emit('messages', messages);
			} catch (err) {
				if (err.message === 'ENOENT') return io.emit('chatInfo', { info: 'No se encontraron mensajes' });
				io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
			}
		});
		socket.on('setNewChatMessages', async (message) => {
			try {
				const data = await Mensaje.find();
				let messages = [];
				if (!!data.length) messages = data;
				const messageWithDate = {
					...message,
					date: new Date().toLocaleString('es-AR')
				};
				const newMessage = new Mensaje(messageWithDate);
				await newMessage.save();
				messages.push(messageWithDate);
				if (message.message.includes('administrador'))
					sendSMS({ message: `email: ${message.email} mensaje: ${message.message}`, phone: '+541151111242' });
				io.emit('messages', messages);
			} catch (err) {
				io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
			}
		});
	});

	const server = http.listen(PORT, async () => {
		try {
			logger.info(`El servidor esta corriendo en el puerto: ${server.address().port}`);
			await createUploadsFolder();
			logger.info(`Id del proceso: ${process.pid}`);
		} catch (err) {
			logger.info(err);
			logger.error(err);
		}
	});

	server.on('error', (err) => {
		logger.info(`Error de servidor: ${err}`);
		logger.error(`Error de servidor: ${err}`);
	});
};

module.exports = fServerOn;
