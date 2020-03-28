const express = require('express');
const DataRoute = express.Router();

const DataController = require('../controllers/DataController');
const DataValidator = require('../validator/DataValidator');

DataRoute.post('/data', DataValidator.create, DataController.create);
DataRoute.get('/data', DataController.index);
DataRoute.patch('/data/:_id', DataController.update, DataController.update);
DataRoute.patch('/data/:_id/status', DataController.updateStatus, DataController.updateStatus);

module.exports = DataRoute;