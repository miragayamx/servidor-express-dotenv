const express = require('express');
const randomsController = require('../controllers/randomsController');

const router = express.Router();

router.get('/randoms', randomsController.getRandomNumbers);

module.exports = router;