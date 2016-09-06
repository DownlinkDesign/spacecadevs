exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogs', function(table) {
    table.increments()
    table.string('title').notNullable()
    table.text('content', 'longText').notNullable()
    table.bigInteger('created_at').notNullable().defaultTo(Date.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blogs')
}
