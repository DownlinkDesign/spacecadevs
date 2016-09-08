exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogs', function(table) {
    table.increments()
    table.string('title').notNullable()
    table.string('thumbnail').notNullable()
    table.text('description', 'longText').notNullable()
    table.text('content', 'longText').notNullable()
    table.integer('author_id').unsigned().references('users.id').onDelete('CASCADE').onUpdate('CASCADE').index()
    table.bigInteger('created_at').notNullable().defaultTo(Date.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blogs')
}
