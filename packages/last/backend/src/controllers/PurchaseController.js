const mongoose = require('mongoose');
require('../models/purchase');
const PurchaseDB = mongoose.model('Purchase');


module.exports = {
    index: async (req, res) => {
        const {page = 1, sexo} = req.query,
            _user = req._user,
            perPage = 10;

        const filter = sexo ? {sexo, kind: 'purchase', _user} : {kind: 'purchase', _user};


        const count = await PurchaseDB.countDocuments(filter);
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(count===0)
            return res.status(204).json([]);

        const transaction = await PurchaseDB.find(filter).sort({date: -1}).skip((page-1)*perPage).limit(perPage).select({__v: false, kind: false, _user: false});
        
        res.status(200).json(transaction);
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
        const {_id} = req.params,
            _user = req._user;

        try {
            const delet = await PurchaseDB.deleteOne({_id, _user});

            if(delet.n===0)
                return res.status(404).json({statusCode: 404, error: "Not Found", message: "This 'purchase' was not found"})
            
            return res.status(204).send();
        } catch (err){
            return res.status(404).json({statusCode: 404, error: "Not Found", message: err.message})
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
                return res.status(404).json({statusCode: 404, error: "Not Found", message: err.message})
            } else {
                return res.status(400).json({statusCode: 400, error: "Bad Reaquest", message: err.message})
            }
        }
    }
}