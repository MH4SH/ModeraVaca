const mongoose = require('mongoose');
require('../models/transactions');
const TransactionSB = mongoose.model('Transaction');

module.exports = {
    index: async (req, res) => {
        const {page = 1} = req.query,
            perPage = 5;

        if(page==0){
            return res.status(404).json({error: "Page invalid"});
        }

        const count = await TransactionSB.countDocuments();
        const transactions = await TransactionSB.find({}, {__v: false}).sort({date: -1}).skip((page-1)*perPage).limit(perPage);

        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage);

        res.status(200).json({transactions});
    }
}