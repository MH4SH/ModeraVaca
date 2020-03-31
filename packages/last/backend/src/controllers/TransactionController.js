const mongoose = require('mongoose');
require('../models/transactions');
const TransactionSB = mongoose.model('Transaction');

module.exports = {
    index: async (req, res) => {
        const {page = 1, dateMin, dateMax} = req.query,
            {_user} = req,
            perPage = 5;

            const target = { a: 1, b: 2 };

        const filter = {_user};
        const date = {};

        if(dateMin)
            Object.assign(date, {$gte: dateMin});

        if(dateMax)
            Object.assign(date, {$lte: dateMax});
        
        if(date!=={})
            Object.assign(filter, {date});

        const count = await TransactionSB.countDocuments(filter);
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(count===0)
            return res.status(204).json([]);
            
        const transactions = await TransactionSB.find(filter, {__v: false, _user: false}).sort({date: -1}).skip((page-1)*perPage).limit(perPage);

        res.status(200).json({dateMin, dateMax, transactions});
    }
}