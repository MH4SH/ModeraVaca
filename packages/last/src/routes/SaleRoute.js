const express = require('express');
const SaleRoute = express.Router();

const SaleController = require('../controllers/SaleController');
const SaleValidator = require('../validator/SaleValidator');

SaleRoute.post('/sale', SaleValidator.create, SaleController.create);
SaleRoute.get('/sale', SaleController.index);
SaleRoute.delete('/sale/:_id', SaleValidator.delete, SaleController.delete);

module.exports = SaleRoute;