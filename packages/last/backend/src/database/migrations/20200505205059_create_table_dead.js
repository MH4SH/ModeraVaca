
exports.up = function(knex) {
    return knex.schema.createTable('dead', table => {    
        table.increments('id').primary();
        table.integer('idCard').unsigned();
        table.integer('idBreeds').unsigned().notNullable();
        table.enu('gender', ['m', 'f']).notNullable();
        table.enu('age', [1, 2, 3, 4, 5, 6, 7]).notNullable();
        table.string('note', 400).notNullable();
        table.timestamp('dateDead').notNullable();
        table.enu('status', [true, false]).notNullable().comment("True: Created a new card, False: Dont Created a new card");


        table.integer('idFarm').unsigned().notNullable();
        table.foreign('idFarm').references('id').inTable('farm');
        table.foreign('idBreeds').references('id').inTable('data');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('dead');
};
