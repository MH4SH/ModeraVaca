const express = require('express');
const CardRoute = express.Router();

const CardController = require('../controllers/CardController');
const CardValidator = require('../validator/CardValidator');

CardRoute.get('/', CardValidator.index, CardController.index);

//Create 
CardRoute.post('/manual', CardValidator.createManual, CardController.createManual);

module.exports = CardRoute;