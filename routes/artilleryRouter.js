const express = require("express");
const artilleryController = require("../controllers/artilleryController");

const router = express.Router();

router.get('/artillery', artilleryController.getInfo);

module.exports = router;