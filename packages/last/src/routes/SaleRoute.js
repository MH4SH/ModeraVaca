const express = require('express');
const SaleRoute = express.Router();

const SaleController = require('../controllers/SaleController');

SaleRoute.post('/sale', SaleController.create);
SaleRoute.get('/sale', SaleController.index);
SaleRoute.delete('/sale/:_id', SaleController.delete);

module.exports = SaleRoute;