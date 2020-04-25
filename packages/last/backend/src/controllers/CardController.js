const mongoose = require('mongoose');
require('../models/card');
const Card = mongoose.model('Card');

module.exports = {
    index: async (req, res) => {

        res.status(200).json({});
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