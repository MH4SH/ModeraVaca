const express = require('express');
const DataRoute = express.Router();

const DataController = require('../controllers/DataController');
const DataValidator = require('../validator/DataValidator');

DataRoute.post('/', DataValidator.create, DataController.create);
DataRoute.get('/', DataController.index);
DataRoute.patch('/:_id', DataController.update, DataController.update);
DataRoute.patch('/:_id/status', DataController.updateStatus, DataController.updateStatus);

module.exports = DataRoute;