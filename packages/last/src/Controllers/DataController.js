const mongoose = require('mongoose');
const Datas = mongoose.model('Datas');

module.exports = {
    index: async (req, res) => {
        const datas = await Datas.find().sort({number: 1});
        var response = {salesman: [], breed: [], buyer: []};
        datas.map(({_id, value, number, kind}) => { response[kind].push({_id, value, number})});

        res.status(201).json(response);
    },
    create: async (req, res) => {
        const {kind, number, value} = req.body;
        try {
            const data = await new Datas({
                kind,
                number,
                value,
            }).save();
    
            res.status(201).json({id: data._id});
        } catch (err){
            res.status(400).json({error: err.message});        
        }
    }   
}