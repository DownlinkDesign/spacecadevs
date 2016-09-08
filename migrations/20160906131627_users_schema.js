exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments()
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.text('user_description', 'longText').notNullable().defaultTo('No description yet')
    table.text('user_image', 'longText').notNullable().defaultTo('http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png')
    table.bigInteger('created_at').notNullable().defaultTo(Date.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
