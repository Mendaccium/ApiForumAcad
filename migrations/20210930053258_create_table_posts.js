
exports.up = function(knex) {
    return knex.schema.createTable("posts", (table) =>{
        table.increments("id").primary();
        table.string("title").notNull();
        table.string("content").notNull();
        table.integer("id_user").unsigned();
        table.foreign("id_user").references("id").inTable("users")
  
    })
};

exports.down = function(knex) {
    table.dropForeign("id_user")
    return knex.schema.dropTable("users");
};
