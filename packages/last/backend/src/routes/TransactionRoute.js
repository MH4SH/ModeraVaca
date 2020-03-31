const express = require('express');
const TransactionRoute = express.Router();

const TransactionController = require('../controllers/TransactionController');
const TransactionValidator = require('../validator/TransactionValidator');

TransactionRoute.get('/', TransactionValidator.index, TransactionController.index);

module.exports = TransactionRoute;