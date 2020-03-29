const {errors} = require('celebrate')

const TransactionRoute = require('./TransactionRoute');
const DataRoute = require('./DataRoute');
const PurchaseRoute = require('./PurchaseRoute');
const SaleRoute = require('./SaleRoute');



module.exports = app => {
    
    app.use('/transaction', TransactionRoute);
    app.use('/data', DataRoute);
    app.use('/purchase', PurchaseRoute);
    app.use('/sale', SaleRoute);
    app.use(errors());
    app.use((req, res) => {
        res.status(404).json({error: "Sorry can't find that!"})
    });
    
}