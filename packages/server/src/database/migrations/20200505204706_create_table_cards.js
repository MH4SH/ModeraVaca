exports.up = function(knex) {
  return knex.schema.createTable('card', table => {
    table.increments('id').primary();
    table.enu('type', ['born', 'dead', 'sale', 'purchase', 'manual']).notNullable();
    table.integer('amount').notNullable();
    table.timestamp('date').notNullable();
    table.timestamp('created').notNullable();


    table.integer('idFarm').unsigned().notNullable();
    table.foreign('idFarm').references('id').inTable('farm');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('card');
};
