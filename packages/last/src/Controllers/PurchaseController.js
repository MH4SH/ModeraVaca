const mongoose = require('mongoose');
const PurchaseModels = require('../Models/purchase');
const Transactions = mongoose.model('Transaction');


module.exports = {
    index: async (req, res) => {
        const {page = 1, sexo} = req.query,
            per_page = 10;

        if(sexo && !(sexo==='f' || sexo==='m')){
            return res.status(400).json({error: 'Sexo invalid.'});
        };

        const filter = sexo ? {sexo} : {};


        const count = await Transactions.countDocuments(filter);
        const transactions = await Transactions.find(filter).sort({date: -1}).skip((page-1)*per_page).limit(per_page);


        res.header('X-Total-Count', count);
        res.header('X-Per-Page', per_page)

        if(!transactions[0]){
            return res.status(204).json([]);
        }

        res.status(200).json(transactions);
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