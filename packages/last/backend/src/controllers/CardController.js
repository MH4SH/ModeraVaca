const mongoose = require('mongoose');
require('../models/card');
const Card = mongoose.model('Card');

module.exports = {
    index: async (req, res) => {
        const {page = 1, dateMin, dateMax} = req.query,
            _user = req._user,
            perPage = 20;

        const filter = {_user};
        const date = {};

        if(dateMin)
            Object.assign(date, {$gte: dateMin});

        if(dateMax)
            Object.assign(date, {$lte: dateMax});
        
        if(date==={})
            Object.assign(filter, {date});

        
        const count = await Card.countDocuments(filter);
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(count===0)
            return res.status(204).json([]);
            
        const transaction = await Card.find(filter, {__v: false, _user: false}).sort({date: -1}).skip((page - 1)*perPage).limit(perPage);

        res.status(200).json(transaction);
    },
    createManual: async (req, res) => {
        
        const {breed, bread_name, cattle, amount, date} = req.body,
            _user = req._user;
        try {
            const card = await new Card({
                _user,
                breeds: [
                    {
                        id: breed,
                        name: bread_name,
                        cattle
                    }
                ],
                amount,
                date
            }).save();
    
            res.status(201).json({_id: card._id});
        } catch (err){
            res.status(400).json({error: err.message});        
        }
    }
}