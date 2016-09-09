var express = require('express')
var router = express.Router()
var signIn = require('./api_helpers/users/signin').signIn
var signUp = require('./api_helpers/users/signup').signUp
var validateUser = require('./api_helpers/validate/validateUser').validateUser

router.post('/signin', function(req, res, next) {
  signIn(req.body)
  .then(function(resolve) {
    res.status(200).json(resolve)
  })
  .catch(function(reject) {
    res.status(200).json(reject)
  })
})

router.post('/signup', function(req, res, next) {
  signUp(req.body)
  .then(function(resolve) {
    res.status(200).json(resolve)
  })
  .catch(function(reject) {
    res.status(200).json(reject)
  })
})

router.post('/validateUser', function(req, res, next) {
  validateUser(req.body)
  .then(function(resolve) {
    res.status(200).json(resolve)
  })
  .catch(function(reject) {
    res.status(200).json(reject)
  })
})

module.exports = router
