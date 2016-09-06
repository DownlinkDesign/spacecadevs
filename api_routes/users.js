var express = require('express')
var router = express.Router()
var signin = require('./api_helpers/users/signin').signin
var signup = require('./api_helpers/users/signup').signup

router.post('/signin', function(req, res, next) {
  signin(req.body)
  .then(function(resolve) {
    res.status(200).json(resolve)
  })
  .catch(function(reject) {
    res.status(200).json(reject)
  })
})

router.post('/signup', function(req, res, next) {
  signup(req.body)
  .then(function(resolve) {
    res.status(200).json(resolve)
  })
  .catch(function(reject) {
    res.status(200).json(reject)
  })
})

module.exports = router
