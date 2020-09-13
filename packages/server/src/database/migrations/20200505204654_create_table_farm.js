exports.up = function(knex) {
	return knex.schema.createTable('farm', table => {
		table.increments('id').primary();
		table.integer('idUser').unsigned().notNullable();
    table.string('name').notNullable();
    
    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

		table.foreign('idUser').references('id').inTable('user');
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('farm');
};