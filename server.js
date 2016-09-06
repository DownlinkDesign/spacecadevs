process.env.NODE_ENV === 'development' ? require('dotenv').config() : null
var express = require('express')
var path = require('path')
var logger = require('morgan')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var cors = require('cors')
var compression = require('compression')

var users = require('./api_routes/users')
var blogs = require('./api_routes/blogs')
var comments = require('./api_routes/comments')
var likes = require('./api_routes/likes')

var app = express()

app.use(favicon(__dirname + '/dist/images/SpaceCadevsNoText.ico'));
app.use(cors())
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/users', users)
app.use('/blogs', blogs)
app.use('/comments', comments)
app.use('/likes', likes)

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
