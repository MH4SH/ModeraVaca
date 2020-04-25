const {errors} = require('celebrate')

const authMiddlewares = require('../middlewares/auth');

const CardRoute = require('./CardRoute');
const TransactionRoute = require('./TransactionRoute');
const DataRoute = require('./DataRoute');
const UserRoute = require('./UserRoute');



module.exports = app => {
    
    app.use('/user', UserRoute);

    app.use('/transaction', authMiddlewares, TransactionRoute);
    app.use('/data', authMiddlewares, DataRoute);
    app.use('/card', authMiddlewares, CardRoute);
    app.use(errors());
    app.use((req, res) => {
        res.status(404).json({error: "Sorry can't find that!"})
    });
    
}