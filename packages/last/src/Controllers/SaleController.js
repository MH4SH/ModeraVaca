const mongoose = require('mongoose');
const SaleModels = require('../Models/sale');
const SaleDB = mongoose.model('Sales');


module.exports = {
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
    }
}