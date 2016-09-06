var knex = require('../../../db_config/knex')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.signup = function(body) {
  return new Promise(function(resolve, reject) {
    if(!body || Object.keys(body).length === 0 && body.constructor === Object){
      reject({ error: 'The form was not properly completed' })
    } else if(body && Object.keys(body).length > 0 && body.constructor === Object) {
      if (body.username
        && typeof body.username === 'string'
        && body.email && typeof body.email === 'string'
        && body.password && typeof body.password === 'string') {
          var password_hash = bcrypt.hashSync(body.password, 10)
          return knex('users')
          .insert({
            username: body.username,
            email: body.email.toLowerCase(),
            password: password_hash
          })
          .returning('*')
          .then(function(user) {
            if (user[0]) {
              if (user[0].id && user[0].username
                && user[0].email && user[0].password
                && user[0].created_at) {
                  try {
                    var token = jwt.sign({ id: user[0].id }, process.env.SECRET)
                    var newUser = {
                      id: user[0].id,
                      username: user[0].username,
                      token: token
                    }
                    resolve({ success: 'User successfully signed up', user: newUser })
                  } catch (e) {
                    reject({ error: 'An error occurred when attempting to sign you up' })
                  }
                }
              } else {
                reject({ error: 'An error occurred when attempting to sign you up' })
              }
            })
            .catch(function(err) {
              if (Number(err.code) === 23505) {
                var uniqueViolationColumn = err.constraint.split('_')
                uniqueViolationColumn = uniqueViolationColumn[1]
                reject({ error: uniqueViolationColumn + ' already exists in the database' })
              } else {
                reject({ error: 'An error occurred when attempting to sign you up' })
              }
            })
          } else {
            reject({ error: 'You did not properly fill out the sign up form' })
          }
        }
      })
    }
