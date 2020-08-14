const bcrypt = require('bcryptjs');


exports.seed = async (knex) => {

    password = await bcrypt.hash('12345', 10);

    await knex('user').insert([
        {
            email: 'marcon@mh4sh.dev',
            phone: '66996956402', 
            name: 'Marcon',
            city: 'Primavera do Leste',
            uf: 'MT',
            password, 
            type: '1',
            created: new Date()
        }
    ]);
};