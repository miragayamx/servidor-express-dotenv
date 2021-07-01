const Producto = require('../models/producto');
const sendEmail = require('../services/nodemailer');

const login = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		res.render('login', { user: req.user ? req.user.userName : null, lista: lista, existe: true });
	} catch (err) {
		res.render('login', { user: req.user ? req.user.userName : null, lista: [], existe: false });
	}
};

const facebookLogin = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		if (req.user) {
			sendEmail({
				form: 'Servidor Node',
				to: 'darrel.romaguera@ethereal.email',
				subject: `Log In user: ${req.user.userName}`,
				html: '<p>Log In</p>'
			});
		}
		res.render('login', { user: req.user ? req.user.userName : null, lista: lista, existe: true });
	} catch (err) {
		res.render('login', { user: req.user ? req.user.userName : null, lista: [], existe: false });
	}
};

const logout = (req, res) => {
	try {
		const userName = req.user ? req.user.username : null;
		if (!userName) return res.redirect('/login');
		req.logout();
		res.status(200).render('logout', { user: userName });
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};
const facebookLogout = (req, res) => {
	try {
		const userName = req.user ? req.user.userName : null;
		if (!userName) return res.redirect('/login');
		req.logout();
		sendEmail({
			form: 'Servidor Node',
			to: 'darrel.romaguera@ethereal.email',
			subject: `Log Out user: ${userName}`,
			html: '<p>Log Out</p>'
		});
		res.status(200).render('logout', { user: userName });
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

const postLogin = async (req, res) => {
	try {
		res.redirect('/login');
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

const failLogin = (req, res) => {
	res.render('fail', { message: 'USER ERROR LOGIN', url: '/login' });
};

const signUp = (req, res) => {
	res.render('signup');
};

const registerUser = (req, res) => res.redirect('/login');

const failSingUp = (req, res) => {
	res.render('fail', { message: 'USER ERROR SIGNUP', url: '/signup' });
};

module.exports = {
	login,
	facebookLogin,
	postLogin,
	logout,
	facebookLogout,
	failLogin,
	signUp,
	registerUser,
	failSingUp
};
