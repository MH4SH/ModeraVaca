exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.enu('type', [1, 2, 3, 4, 5]).notNullable();
    table.string('name', 80).notNullable();
    table.string('email', 200).notNullable();
    table.string('password').notNullable();
    table.bigInteger('phone', 20).notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();
    table.datetime('created').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');  
};
