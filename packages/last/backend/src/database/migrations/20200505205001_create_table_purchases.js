exports.up = function(knex) {
    return knex.schema.createTable('purchases', table => {
        table.increments('id').primary();
        table.integer('idCard').unsigned().notNullable();
        table.integer('idBreeds').unsigned().notNullable();
        table.enu('gender', ['m', 'f']).notNullable();
        table.enu('age', [1, 2, 3, 4, 5, 6, 7]).notNullable();
        table.integer('amount').notNullable();
        table.integer('priceAmount').notNullable();
        table.integer('priceDelivery').notNullable();
        table.string('note', 400).notNullable();
        table.integer('idSeller').unsigned().notNullable();


        table.integer('idFarm').unsigned().notNullable();
        table.foreign('idFarm').references('id').inTable('farm');
        table.foreign('idCard').references('id').inTable('cards');
        table.foreign('idBreeds').references('id').inTable('data');
        table.foreign('idSeller').references('id').inTable('data');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('purchases');
};