exports.up = function(knex) {
	  return knex.schema.createTable('user', table => {
		table.increments('id').primary();
		table.enu('type', [1, 2, 3, 4, 5]).notNullable();
		table.string('name', 80).notNullable();
		table.string('email', 200).notNullable();
		table.string('password').notNullable();
		table.bigInteger('phone', 20).notNullable();
		table.string('city').notNullable();
    table.string('uf').notNullable();
    
    table.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('user');  
};
