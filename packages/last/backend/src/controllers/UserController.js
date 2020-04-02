const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
require('../models/user');

const User = mongoose.model('Users');

module.exports = {
    index: async (req, res) => {
        const {page = 1} = req.query,
            _userType = req._userType,
            perPage = 10;

        if(_userType!==1)
            return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "You don't have pemission"});
        
        const count = await User.countDocuments();
        res.header('X-Total-Count', count);
        res.header('X-Per-Page', perPage)

        if(count===0)
            return res.status(204).json([]);

        const users = await User.find().sort({_id: -1}).skip((page-1)*perPage).limit(perPage).select({__v: false, pass: false});
        
        res.status(200).json(users);
    },
    register: async (req, res) => {
        const body = req.body,
            phoneBody = body.phone.slice(-2),
            emailBody = body.email.toLowerCase();

        try {
            if(await User.findOne({$or: [{phone: phoneBody}, {email: emailBody}]}))
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"phone\" or \"email\" already in use", validation: { source: "body", keys: [ "phone", "email"]}})

            const user = await new User(req.body).save();
            user.pass = undefined;
            user.__v = undefined;

            return res.status(201).json({
                user,
                token: generateToken({id: user._id, type: user.type})
            })
        } catch (err) {
            return res.status(400).json({statusCode: 400, error: "Bad Request", message: err.message})
        }
    },
    auth: async (req, res) => {
        const {body} = req,
            {pass, access} = body;

        const user = await User.findOne({$or: [{phone: access}, {email: access}]}).select('+pass');

        if(!user)
            return res.status(400).json({statusCode: 400, error: "Bad Request", message: "user not found", validation: { source: "body", keys: [ "access"]}})

        if(!await bcrypt.compare(pass, user.pass))
            return res.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied", validation: { source: "body", keys: [ "pass"]}})

            user.pass = undefined;
            user.__v = undefined;

        return res.status(200).json({
            user,
            token: generateToken({id: user._id, type: user.type})
        })
    }
}