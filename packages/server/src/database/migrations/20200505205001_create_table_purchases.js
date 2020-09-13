exports.up = function(knex) {
	return knex.schema.createTable('purchase', table => {
		table.increments('id').primary();
		table.integer('idBreeds').unsigned().notNullable();
		table.enu('gender', ['m', 'f']).notNullable();
		table.timestamp('dateBirth').notNullable();
		table.integer('amount').notNullable();
		table.integer('priceAmount').notNullable();
		table.integer('priceDelivery').notNullable();
		table.string('note', 400);
		table.integer('idSeller').unsigned().notNullable();

    table.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

		table.integer('idFarm').unsigned().notNullable();
		table.foreign('idFarm').references('id').inTable('farm');
		table.foreign('idBreeds').references('id').inTable('data');
		table.foreign('idSeller').references('id').inTable('data');
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('purchase');
};