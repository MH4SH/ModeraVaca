exports.up = function(knex) {
  return knex.schema.createTable('animal', table => {
    table.increments('id').primary();
    table.integer('idBreeds').unsigned().notNullable();
    table.enu('type', ['born', 'purchase']).notNullable();
    table.timestamp('dateBorn').notNullable();
    table.enu('gender', ['m', 'f']).notNullable();
    table.boolean('hasNow').defaultTo(true).notNullable().comment("True: exist in this farm, False: This animal is sended or her dead");
    table.timestamp('created').notNullable();


    table.integer('idFarm').unsigned().notNullable();
    table.foreign('idFarm').references('id').inTable('farm');
    table.foreign('idBreeds').references('id').inTable('data');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('animal');
};
