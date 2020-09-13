exports.up = function(knex) {
  return knex.schema.createTable('animal', table => {
	table.increments('id').primary();
	table.integer('idBreeds').unsigned().notNullable();
	table.enu('gender', ['m', 'f']).notNullable();
	table.enu('type', ['birth', 'purchase']).notNullable();
	table.timestamp('dateBirth').notNullable();
	table.boolean('hasNow').defaultTo(true).notNullable().comment("True: exist in this farm, False: This animal is sended or her dead");

  table.dateTime('created_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  table.dateTime('updated_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

	table.integer('idFarm').unsigned().notNullable();
	table.foreign('idFarm').references('id').inTable('farm');
	table.foreign('idBreeds').references('id').inTable('data');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('animal');
};
