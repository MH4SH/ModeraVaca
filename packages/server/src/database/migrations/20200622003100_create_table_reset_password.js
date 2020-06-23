
exports.up = function(knex) {
    return knex.schema.createTable('resetPassword', table => {    
        table.increments('id').primary();
        table.integer('idUser').unsigned().notNullable();
        table.integer('token').notNullable();
        table.integer('code').notNullable();
        
        table.foreign('idUser').references('id').inTable('user');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('resetPassword');
};
