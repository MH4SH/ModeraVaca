const express = require('express');

const DataController = require('./Controllers/DataController');
const PurchaseController = require('./Controllers/PurchaseController');
const SaleController = require('./Controllers/SaleController');


async function teste(req, res){
    res.status(201).json({teste: "teste"});
}



const routes = express.Router();

routes.post('/data', DataController.create);
routes.get('/data', DataController.index);
routes.patch('/data/:_id', DataController.update);
routes.patch('/data/:_id/status', DataController.updateStatus);

routes.post('/purchase', PurchaseController.create);
routes.get('/purchase', PurchaseController.index);
routes.delete('/purchase/:_id', PurchaseController.delete);
routes.put('/purchase/:_id', PurchaseController.update);

routes.post('/sale', SaleController.create);
routes.get('/sale', SaleController.index);
routes.delete('/sale/:_id', SaleController.delete);





module.exports = routes;