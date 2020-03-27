const express = require('express');
const PurchaseRoute = express.Router();

const PurchaseController = require('./../Controllers/PurchaseController');

PurchaseRoute.post('/purchase', PurchaseController.create);
PurchaseRoute.get('/purchase', PurchaseController.index);
PurchaseRoute.delete('/purchase/:_id', PurchaseController.delete);
PurchaseRoute.put('/purchase/:_id', PurchaseController.update);

module.exports = PurchaseRoute;