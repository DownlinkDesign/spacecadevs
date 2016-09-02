require('dotenv').config()
var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')

var auth = require('./api_routes/auth')
var blogs = require('./api_routes/blogs')

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/auth', auth)
app.use('/blogs', blogs)

app.all('*', function(req,res,next) {
  res.sendFile('index.html', { root: `${__dirname}/dist/`})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})


module.exports = app
