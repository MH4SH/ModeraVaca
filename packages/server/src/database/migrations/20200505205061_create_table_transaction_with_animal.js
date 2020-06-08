
exports.up = function(knex) {
    return knex.schema.createTable('transaction_with_animal', table => {    
        table.increments('id').primary();
        table.integer('idAnimal').unsigned().notNullable();
        table.integer('idTransaction').unsigned().notNullable();
        table.enu('type', ['born', 'dead', 'sale', 'purchase', 'manual']).notNullable();
        

        table.integer('idFarm').unsigned().notNullable();
        table.foreign('idFarm').references('id').inTable('farm');
        table.foreign('idAnimal').references('id').inTable('data');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transaction_with_animal');
};
