const express = require('express');
const DataRoute = express.Router();

const DataController = require('./../Controllers/DataController');

DataRoute.post('/data', DataController.create);
DataRoute.get('/data', DataController.index);
DataRoute.patch('/data/:_id', DataController.update);
DataRoute.patch('/data/:_id/status', DataController.updateStatus);

module.exports = DataRoute;