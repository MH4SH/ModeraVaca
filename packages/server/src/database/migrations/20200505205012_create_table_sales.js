exports.up = function(knex) {
	return knex.schema.createTable('sale', table => {	
		table.increments('id').primary();
		table.integer('idBreeds').unsigned().notNullable();
		table.enu('gender', ['m', 'f']).notNullable();
		table.integer('amount').notNullable();
		table.integer('priceAmount').notNullable();
		table.string('note', 400);
		table.integer('idBuyer').unsigned().notNullable();
		table.timestamp('created').notNullable();


		table.integer('idFarm').unsigned().notNullable();
		table.foreign('idFarm').references('id').inTable('farm');
		table.foreign('idBreeds').references('id').inTable('data');
		table.foreign('idBuyer').references('id').inTable('data');
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('sale');
};