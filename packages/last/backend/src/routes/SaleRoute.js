const express = require('express');
const SaleRoute = express.Router();

const SaleController = require('../controllers/SaleController');
const SaleValidator = require('../validator/SaleValidator');

SaleRoute.post('/', SaleValidator.create, SaleController.create);
SaleRoute.get('/', SaleValidator.index, SaleController.index);
SaleRoute.delete('/:_id', SaleValidator.delete, SaleController.delete);

module.exports = SaleRoute;