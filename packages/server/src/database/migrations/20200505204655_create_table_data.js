
exports.up = function(knex) {
  return knex.schema.createTable('data', table => {
	table.increments('id').primary();
	table.string('kind', 20).notNullable();
	table.string('value', 80).notNullable();
	table.boolean('status').defaultTo(true).notNullable();
	
	table.integer('idFarm').unsigned().notNullable();
	table.foreign('idFarm').references('id').inTable('farm');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('data');
};
