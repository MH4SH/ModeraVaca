const express = require('express');
const PurchaseRoute = express.Router();

const PurchaseController = require('../controllers/PurchaseController');
const PurchaseValidator = require('../validator/PurchaseValidator');

PurchaseRoute.post('/', PurchaseValidator.create, PurchaseController.create);
PurchaseRoute.get('/', PurchaseValidator.index, PurchaseController.index);
PurchaseRoute.put('/:_id', PurchaseValidator.update, PurchaseController.update);
PurchaseRoute.delete('/:_id', PurchaseValidator.delete, PurchaseController.delete);

module.exports = PurchaseRoute;