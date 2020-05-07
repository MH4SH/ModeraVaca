
exports.up = function(knex) {
    return knex.schema.createTable('cards_item', table => {
        table.increments('id').primary();
        table.integer('idCard').unsigned().notNullable();
        table.integer('idBreeds').unsigned().notNullable();
        table.enu('gender', ['m', 'f']).notNullable();
        table.enu('age', [1, 2, 3, 4, 5, 6, 7]).notNullable();
        table.integer('total', 11).notNullable();


        table.integer('idFarm').unsigned().notNullable();
        table.foreign('idFarm').references('id').inTable('farm');
        table.foreign('idCard').references('id').inTable('cards');
        table.foreign('idBreeds').references('id').inTable('data');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cards_item');
};
