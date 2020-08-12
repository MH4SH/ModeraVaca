exports.up = function(knex) {
    return knex.schema.table('cards', table => {
        table.integer('amount').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.table('cards', table => {
        table.dropColumn('amount');
    })  
};
