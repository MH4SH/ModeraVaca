const express = require('express');
const {errors} = require('celebrate')
const TransactionRoute = require('./TransactionRoute');
const DataRoute = require('./DataRoute');
const PurchaseRoute = require('./PurchaseRoute');
const SaleRoute = require('./SaleRoute');


const routes = express();

routes.use(TransactionRoute);
routes.use(DataRoute);
routes.use(PurchaseRoute);
routes.use(SaleRoute);
routes.use(errors());
routes.use((req, res) => {
    res.status(404).json({error: "Sorry can't find that!"})
});

module.exports = routes;