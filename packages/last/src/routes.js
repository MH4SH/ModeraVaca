const express = require('express');

const DataController = require('./Controllers/DataController');


async function teste(req, res){
    res.status(201).json({teste: "teste"});
}



const routes = express.Router();

routes.post('/data', DataController.create);
routes.get('/data', DataController.index);







module.exports = routes;