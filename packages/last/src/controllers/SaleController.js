const mongoose = require('mongoose');
require('../models/sale');
const SaleDB = mongoose.model('Sales');


module.exports = {
    index: async (req, res) => {
        const {page = 1} = req.query,
            perPage = 10;

        const filter = {kind: "sale"};
        
        const count = await SaleDB.countDocuments(filter);
        const transaction = await SaleDB.find(filter).skip((page - 1)*perPage).limit(perPage);

        const response = [];

        transaction.map(({_id, buyer, purchase, date, amount, cattle}) => response.push({_id, buyer, purchase, date, amount, cattle}));
        
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(!transaction[0]){
            return res.status(204).json([]);
        }

        res.status(200).json(response);
    },
    create: async (req, res) => {
        const {buyer, purchase, date, amount, cattle} = req.body;
        
        try {
            const transaction = await new SaleDB({
                buyer,
                purchase,
                date,
                amount,
                cattle
            }).save();
    
            res.status(201).json({_id: transaction._id});
        } catch (err){
            res.status(400).json({error: err.message});        
        }
    },
    delete: async (req, res) => {
        const {_id} = req.params;

        try {
            await SaleDB.deleteOne({_id});

            res.status(204).json();
        } catch(err){
            res.status(400).json({error: err.message})
        }
    }
}