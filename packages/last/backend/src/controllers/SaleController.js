const mongoose = require('mongoose');
require('../models/sale');
const SaleDB = mongoose.model('Sales');


module.exports = {
    index: async (req, res) => {
        const {page = 1} = req.query,
            _user = req._user,
            perPage = 10;

        const filter = {kind: "sale", _user};
        
        const count = await SaleDB.countDocuments(filter);
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(count===0)
            return res.status(204).json([]);
            
        const transaction = await SaleDB.find(filter).skip((page - 1)*perPage).limit(perPage).select({__v: false, kind: false, _user: false});        

        res.status(200).json(transaction);
    },
    create: async (req, res) => {
        const {buyer, purchase, date, amount, cattle} = req.body,
            _user = req._user;
        
        try {
            const transaction = await new SaleDB({
                _user,
                buyer,
                purchase,
                date,
                amount,
                cattle
            }).save();
    
            res.status(201).json({_id: transaction._id});
        } catch (err){
            return res.status(400).json({statusCode: 400, error: "Bad Request", message: err.message})
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