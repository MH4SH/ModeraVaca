const express = require('express');
const PurchaseRoute = express.Router();

const PurchaseController = require('../controllers/PurchaseController');
const PurchaseValidator = require('../validator/PurchaseValidator');

PurchaseRoute.post('/purchase', PurchaseValidator.create, PurchaseController.create);
PurchaseRoute.get('/purchase', PurchaseController.index);
PurchaseRoute.put('/purchase/:_id', PurchaseValidator.update, PurchaseController.update);
PurchaseRoute.delete('/purchase/:_id', PurchaseValidator.delete, PurchaseController.delete);

module.exports = PurchaseRoute;