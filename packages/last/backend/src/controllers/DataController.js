const mongoose = require('mongoose');
const DataModels = require('../models/data');
const Datas = mongoose.model('Datas');

module.exports = {
    index: async (req, res) => {
        const _user = req._user;
        const datas = await Datas.find({_user}).sort({number: 1});
        var response = {salesman: [], breed: [], buyer: []};
        datas.map(({_id, value, number, kind}) => { response[kind].push({_id, value, number})});

        res.status(201).json(response);
    },
    update: async (req, res) => {
        const {_id} = req.params,
            _user = req._user,
            {value} = req.body;
        try {
            const doc = await Datas.updateOne({_id, _user}, {value});
            if(doc.n===0){ throw {status: 404, message: `Data "${_id}" don't found!`}}
            
            res.status(201).json({_id, value});
        } catch (err){
            if(err.status===404){
                res.status(404).json({statusCode: 404, error: "Not Found", message: err.message}); 
            } else {
                res.status(400).json({statusCode: 400, error: "Bad Request", message: err.message, validation: { source: "params", keys: ["_id"]} }); 
            }
        }
    },
    updateStatus: async (req, res) => {
        const {_id} = req.params,
            {status} = req.body;
        try {
            const doc = await Datas.updateOne({_id}, {status});
            if(doc.n===0){ throw {status: 404, message: `Data "${_id}" don't found!`}}
            
            res.status(200).json({_id, status});
        } catch (err){
            if(err.status===404){
                res.status(404).json({statusCode: 404, error: "Not Found", message: err.message}); 
            } else {
                res.status(400).json({statusCode: 400, error: "Bad Request", message: err.message, validation: { source: "params", keys: ["_id"]} }); 
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