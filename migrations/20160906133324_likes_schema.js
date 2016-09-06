exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function(table) {
    table.increments()
    table.integer('liker_id').unsigned().references('users.id').onDelete('CASCADE').onUpdate('CASCADE').index()
    table.integer('blog_id').unsigned().references('blogs.id').onDelete('CASCADE').onUpdate('CASCADE').index()
    table.bigInteger('created_at').notNullable().defaultTo(Date.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes')
}
