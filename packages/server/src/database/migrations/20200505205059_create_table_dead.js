exports.up = function(knex) {
	return knex.schema.createTable('dead', table => {
		table.increments('id').primary();
		table.integer('idBreeds').unsigned().notNullable();
		table.enu('gender', ['m', 'f']).notNullable();
		table.string('note', 400);
		table.timestamp('dateDead').notNullable();
		table.timestamp('created').notNullable();


		table.integer('idFarm').unsigned().notNullable();
		table.foreign('idFarm').references('id').inTable('farm');
		table.foreign('idBreeds').references('id').inTable('data');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('dead');
};
