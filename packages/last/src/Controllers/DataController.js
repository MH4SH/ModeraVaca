const mongoose = require('mongoose');
const DataModels = require('../Models/data');
const Datas = mongoose.model('Datas');

module.exports = {
    index: async (req, res) => {
        const datas = await Datas.find().sort({number: 1});
        var response = {salesman: [], breed: [], buyer: []};
        datas.map(({_id, value, number, kind}) => { response[kind].push({_id, value, number})});

        res.status(201).json(response);
    },
    update: async (req, res) => {
        const {_id} = req.params,
            {value} = req.body;
        try {
            if(!value){ return res.value(400).json({error: "Parametr 'value' is required"})};

            const doc = await Datas.updateOne({_id}, {value});
            
            res.status(201).json({_id, value});
        } catch (err){
            if(err.path==="_id"){
                res.status(404).json({error: err.message}); 
            } else {
                res.status(400).json({error: "Parametr 'value' don't is Sring"});
            }
        }
    },
    updateStatus: async (req, res) => {
        const {_id} = req.params,
            {status} = req.body;
        try {
            if(status===undefined || status===null){ return res.status(400).json({error: "Parametr 'status' is required"})};

            const doc = await Datas.updateOne({_id}, {status});
            
            res.status(201).json({_id, status});
        } catch (err){
            if(err.path==="_id"){
                res.status(404).json({error: err.message}); 
            } else {
                res.status(400).json({error: "Parametr 'status' don't is Boolean"});
            }
        }
    },
    create: async (req, res) => {
        const {kind, number, value} = req.body;
        try {
            const data = await new Datas({
                kind,
                number,
                value,
            }).save();
    
            res.status(201).json({_id: data._id});
        } catch (err){
            res.status(400).json({error: err.message});        
        }
    }   
}