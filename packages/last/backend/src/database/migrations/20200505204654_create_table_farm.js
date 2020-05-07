exports.up = function(knex) {
    return knex.schema.createTable('farm', table => {
        table.increments('id').primary();
        table.integer('idUser').unsigned().notNullable();
        table.string('name').notNullable();

        table.foreign('idUser').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('farm');
};