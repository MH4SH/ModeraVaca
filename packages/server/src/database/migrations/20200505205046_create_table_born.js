
exports.up = function(knex) {
	return knex.schema.createTable('birth', table => {	
		table.increments('id').primary();
		table.integer('idBreeds').unsigned().notNullable();
		table.enu('gender', ['m', 'f']).notNullable();
		table.integer('amount').notNullable();
		table.string('note', 400);
    table.timestamp('dateBirth')
      .notNullable()
      .defaultTo();
		
    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

		table.integer('idFarm').unsigned().notNullable();
		table.foreign('idFarm').references('id').inTable('farm');
		table.foreign('idBreeds').references('id').inTable('data');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('birth');
};
