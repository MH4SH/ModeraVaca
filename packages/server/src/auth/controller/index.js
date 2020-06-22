const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');
const generateToken = require('../utils/generateToken');
const generateNumberCode = require('../../utils/generateNumberCode');

//Send email api
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Send sms api
const sendSMS = require('../../utils/sendSMS');

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
    getNewPassword: async (req, res) => {
        const {type, access} = req.body;

        try {
            const userData = await connection('user')
                .where({[type]: access})
                .first();

            if(!userData)
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: `user not found with this ${type}`, validation: { source: "body", keys: ['access']}})

            let token = await bcrypt.genSalt(10);
            let code = generateNumberCode(6);
            
            switch (type) {
                case 'phone':
                    sendSMS.send({numberSMS: `55${access}`, message: `${code}: Seu token para redefinir a senha no ModeraVaca.`});
                break;
                case 'email':
                    console.log('sgMail');
                    console.log(process.env.SENDGRID_API_KEY);
                    const msg = {
                      to: 'marconw201012@gmail.com',
                      from: 'no_replay@moderavaca.mh4sh.dev',
                      subject: 'Sending with SendGrid is Fun',
                      text: 'and easy to do anywhere, even with Node.js',
                      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                    };

                    sgMail.send(msg);

                break;
            }

            return res.status(200).json({statusCode: 200, token})
        } catch (err) {
            return res.status(200).json({statusCode: 400, error: 'Bad Request'})
        }

    },
    setNewPassword: async (req, res) => {
        return res.status(200).json({statusCode: 400, error: 'Bad Request'})
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
