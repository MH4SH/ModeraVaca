const express = require('express');

const DataController = require('./Controllers/DataController');
const PurchaseController = require('./Controllers/PurchaseController');


async function teste(req, res){
    res.status(201).json({teste: "teste"});
}



const routes = express.Router();

routes.post('/data', DataController.create);
routes.get('/data', DataController.index);
routes.patch('/data/:_id', DataController.update);
routes.patch('/data/:_id/status', DataController.updateStatus);

routes.post('/purchase', PurchaseController.create);






module.exports = routes;