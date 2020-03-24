const mongoose = require('mongoose');
const Datas = mongoose.model('Datas');

module.exports = {
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