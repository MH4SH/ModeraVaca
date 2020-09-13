const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.seed = async (knex) => {

    password = await bcrypt.hash(process.env.PASS_USER_SEED, 10);

    await knex('user').insert([
        {
            email: 'marcon@mh4sh.dev',
            phone: '66996956402', 
            name: 'Marcon',
            city: 'Primavera do Leste',
            uf: 'MT',
            password, 
            type: '1'
        }
    ]);
};