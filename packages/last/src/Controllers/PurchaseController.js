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

        const filter = sexo ? {sexo, kind: 'purchase'} : {kind: 'purchase'};


        const count = await Transactions.countDocuments(filter);
        const transactions = await Transactions.find(filter).sort({date: -1}).skip((page-1)*per_page).limit(per_page);

        const response = [];
        
        transactions.map(({_id, salesman, breed, sexo, date, birth, amount, head_price, freight}) => response.push({_id, salesman, breed, sexo, date, birth, amount, head_price, freight}))

        res.header('X-Total-Count', count);
        res.header('X-Per-Page', per_page)

        if(!transactions[0]){
            return res.status(204).json([]);
        }

        res.status(200).json(response);
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
    },
    delete: async (req, res) => {
        const {_id} = req.params;

        try {
            await Transactions.deleteOne({_id});
            
            res.status(204).send();
        } catch (err){
            res.status(404).json({error: err.message}); 
        }

    },
    update: async (req, res) => {
        const {_id} = req.params,
            data = req.body;

        try {
            await Transactions.updateOne({_id, kind: "purchase"}, data);

            res.status(205).json(data);
        } catch (err){
            if(err.path==="_id"){
                res.status(404).json({error: err.message}); 
            } else {
                res.status(400).json({error: err.message});
            }
        }
    }
}