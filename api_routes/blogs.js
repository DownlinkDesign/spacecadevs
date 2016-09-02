var express = require('express')
var router = express.Router()
var knex = require('../db_config/knex')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

router.get('/blogs', function(req, res, next) {
  res.status(200).json('blogs')
})

module.exports = router
