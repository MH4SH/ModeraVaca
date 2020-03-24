const mongoose = require('mongoose');
const PurchaseModels = require('../Models/purchase');
const Transactions = mongoose.model('Transaction');


module.exports = {
    index: async (req, res) => {
        const datas = await Transactions.find().sort({date: 1});
        var response = {salesman: [], breed: [], buyer: []};
        datas.map(({_id, value, number, kind}) => { response[kind].push({_id, value, number})});

        res.status(201).json(response);
    },
    create: async (req, res) => {
        
        const {salesman, breed, sexo, date, birth, amount, head_price, freight} = req.body;
        try {
            const transaction = await new Transactions({
                salesman,
                breed,
                sexo,
                date,
                birth,
                amount,
                head_price,
                freight
            }).save();
    
            res.status(201).json({_id: transaction._id});
        } catch (err){
            res.status(400).json({error: err.message});        
        }
    }
}