const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const upload = require('../middleware/multer');
const graphqlController = require('../graphql/graphqlController');

const router = express.Router();

const imagePathCapture = (req, res, next) => {
	const { title, price } = req.body;
	req.body.variables = {
		title: title,
		price: price,
		thumbnail: '/uploads/' + req.file.filename
	};
    next();
};

router.post(
	'/graphql',
	upload.single('thumbnail'),
	imagePathCapture,
	graphqlHTTP({
		schema: graphqlController.schema,
		rootValue: graphqlController.root,
		graphiql: true
	})
);

module.exports = router;
