const mongoose = require('mongoose');
const generateToken = require('../utils/generateToken');
require('../models/user');

const User = mongoose.model('Users');

module.exports = {
    register: async (req, res) => {
        const body = req.body,
            userBody = body.user.toLowerCase();

        try {
            if(await User.findOne({user: userBody}))
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"user\" already in use", validation: { source: "body", keys: [ "user"]}})

            const user = await new User(req.body).save();
            user.pass = undefined;

            return res.status(201).json({
                user,
                token: generateToken({id: user._id})
            })
        } catch (err) {
            return res.status(400).json({error: err.message})
        }
    }
}