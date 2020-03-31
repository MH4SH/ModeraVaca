const mongoose = require('mongoose');
require('../models/purchase');
const PurchaseDB = mongoose.model('Purchase');


module.exports = {
    index: async (req, res) => {
        const {page = 1, sexo} = req.query,
            perPage = 10;

        if(sexo && !(sexo==='f' || sexo==='m')){
            return res.status(400).json({error: 'Sexo invalid.'});
        };

        const filter = sexo ? {sexo, kind: 'purchase'} : {kind: 'purchase'};


        const count = await PurchaseDB.countDocuments(filter);
        const transaction = await PurchaseDB.find(filter).sort({date: -1}).skip((page-1)*perPage).limit(perPage);

        const response = [];
        
        transaction.map(({_id, salesman, breed, sexo, date, birth, amount, head_price, freight}) => response.push({_id, salesman, breed, sexo, date, birth, amount, head_price, freight}))

        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(!transaction[0]){
            return res.status(204).json([]);
        }

        res.status(200).json(response);
    },
    create: async (req, res) => {
        const {salesman, breed, sexo, date, birth, amount, head_price, freight} = req.body,
            _user = req._user;
        
        try {
            const transaction = await new PurchaseDB({
                _user,
                salesman,
                breed,
                sexo,
                date,
                birth,
                amount,
                head_price,
                freight
            }).save();
    
            res.status(201).json({_id: transaction.id});
        } catch (err){
            return res.status(400).json({statusCode: 400, error: "Bad Request", message: err.message})    
        }
    },
    delete: async (req, res) => {
        const {_id} = req.params;

        try {
            await PurchaseDB.deleteOne({_id});
            
            res.status(204).send();
        } catch (err){
            res.status(404).json({error: err.message}); 
        }

    },
    update: async (req, res) => {
        const {_id} = req.params,
            _user = req._user,
            data = req.body;

        try {
            const update = await PurchaseDB.updateOne({_user, _id, kind: "purchase"}, data);

            if(update.n===0)
                return res.status(404).json({statusCode: 404, error: "Not Found", message: "This 'purchase' was not found"})

            res.status(200).json(data);
        } catch (err){
            if(err.path==="_id"){
                res.status(404).json({error: err.message}); 
            } else {
                res.status(400).json({error: err.message});
            }
        }
    }
}