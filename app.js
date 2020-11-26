var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var bodyParser = require('body-parser')

const sessionConfig = require('./config/session')

// Routes
var userRouter = require('./routes/user')
var loginRouter = require('./routes/login')
var homeRouter = require('./routes/home')
var reservationRouter = require('./routes/reservation')

var app = express()

app.use(session({
    secret: sessionConfig.secret,
    resave: sessionConfig.resave,
    saveUninitialized: sessionConfig.saveUninitialized
}))

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Endpoints
app.use('/', loginRouter)
app.use('/user', userRouter)
app.use('/home', homeRouter)
app.use('/reservation', reservationRouter)

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  next(createError(404))
})

// error handler
app.use(function(err, request, response, next) {
  console.log(err.status, err)
  response.status(err.status || 500)
  response.json({
    message: err.message,
    error: err
  })
})

module.exports = app
