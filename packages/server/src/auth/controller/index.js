const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');
const generateToken = require('../utils/generateToken');

const UserController = {
    register: async (req, res) => {
        const body = req.body,
            {phone, email} = body;
            try {
                if((await connection('user').where({phone}).orWhere({email})).length!==0)
                    return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"user\" already in use", validation: { source: "body", keys: [ "email", "phone"]}})

                body.password = await bcrypt.hash(body.password, 10);

                const [id] = await connection('user')
                .insert({
                    ...body,
                    type: '3',
                    created: new Date()
                });

                body.password = undefined;
                return res.status(200).json({user: {id, ...body, type: '3'}, token: generateToken({id, phone, email, type: '3'})});

            } catch (err) {
                return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
            }
    },
    auth: async (req, res) => {
        const {password, access} = req.body;
        try {
            const userData = await connection('user')
                .where({email: access})
                .orWhere({phone: access})
                .first();
            
            if(!userData)
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: "user not found", validation: { source: "body", keys: [ "email", "phone"]}})
            
            if(!await bcrypt.compare(password, userData.password))
                return res.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied", validation: { source: "body", keys: [ "password"]}})
            
            userData.password = undefined;

            res.status(200).json({user: {...userData}, token: generateToken({id: userData.id, phone: userData.phone, email: userData.email, type: userData.type})});
        } catch (err) {
            return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
        }
    }
}

module.exports = UserController;
