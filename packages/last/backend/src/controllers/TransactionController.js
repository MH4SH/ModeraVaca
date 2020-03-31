const mongoose = require('mongoose');
require('../models/transactions');
const TransactionSB = mongoose.model('Transaction');

module.exports = {
    index: async (req, res) => {
        const {page = 1} = req.query,
            {_user} = req,
            perPage = 5;

        const count = await TransactionSB.countDocuments({_user});
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(count===0)
            return res.status(204).json([]);
            
        const transactions = await TransactionSB.find({_user}, {__v: false, _user: false}).sort({date: -1}).skip((page-1)*perPage).limit(perPage);

        res.status(200).json({_user, transactions});
    }
}