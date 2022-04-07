
// migration to postresql database --- creates tables in the database
export async function up (knex){
    return await knex.schema.createTable('cat_facts', tbl => {
        tbl.increments('id').primary();               // primary key -> id
        tbl.string('object_id', 30).notNullable();    // object id of cat fact gotten as primary Id from external API
        tbl.string('user', 50).notNullable();         // object ID of user who posted the cat fact
        tbl.string('text').unique().notNullable();    // content of cat fact
        tbl.string('source', 50).notNullable();       // source of cat fact
        tbl.string('originally_created').notNullable(); // cat fact create date gotten from external API
        tbl.string('last_updated').notNullable();      // cat fact last edited date gotten from external API
        tbl.boolean('deleted').defaultTo(false);       // cat fact deleted status from external API
        tbl.boolean('used').defaultTo(false);          // cat fact used status from external API
        tbl.timestamp('createdAt').defaultTo(knex.fn.now()); // cat fact added locally date
    })
};

export function down (knex) {
    return knex.schema.dropTableIfExists('users')
};
