const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
            user.__v = undefined;

            return res.status(201).json({
                user,
                token: generateToken({id: user._id, type: user.type})
            })
        } catch (err) {
            return res.status(400).json({error: err.message})
        }
    },
    auth: async (req, res) => {
        const {body} = req,
            userBody = body.user,
            {pass} = body;

        const user = await User.findOne({user: userBody}).select('+pass');

        if(!user)
            return res.status(400).json({statusCode: 400, error: "Bad Request", message: "user not found", validation: { source: "body", keys: [ "user"]}})

        if(!await bcrypt.compare(pass, user.pass))
            return res.status(403).json({statusCode: 405, error: "Forbidden", message: "access denied", validation: { source: "body", keys: [ "pass"]}})

            user.pass = undefined;
            user.__v = undefined;

        return res.status(200).json({
            user,
            token: generateToken({id: user._id, type: user.type})
        })
    }
}