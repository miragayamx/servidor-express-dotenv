const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const graphqlController = require('../controllers/graphqlController');

const router = express.Router();

router.get('/graphql', graphqlHTTP({
    schema: graphqlController.schema,
    rootValue: graphqlController.root,
    graphiql: true
}));

module.exports = router;