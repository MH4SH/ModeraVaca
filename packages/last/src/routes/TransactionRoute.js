const express = require('express');
const TransactionRoute = express.Router();

const TransactionController = require('../controllers/TransactionController');

TransactionRoute.get('/transaction', TransactionController.index);

module.exports = TransactionRoute;