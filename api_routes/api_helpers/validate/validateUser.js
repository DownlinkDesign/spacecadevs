require('dotenv').config()
var knex = require('../../../db_config/knex')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.validateUser = function(body) {
  return new Promise(function(resolve, reject) {
    try {
      var decoded = jwt.verify(body.token, process.env.SECRET)
      if (decoded.id === JSON.parse(body.user).id) {
        return knex('users')
        .where({
          id: decoded.id
        })
        .then(function(user){
          if (user.length > 0) {
            resolve({ success: decoded })
          } else {
            throw Error('Token doesn\'t match user');
          }
        })
        .catch(function(err) {
          reject({ error: err })
        })
      } else {
        throw Error('Token doesn\'t match user');
      }
    }
    catch(err) {
      reject({ error: err.message })
    }
  })
}
