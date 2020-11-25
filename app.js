var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

// Routes
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var reservationRouter = require('./routes/reservation');

var app = express();

app.use(session({
    secret: 'fjweiufh93ghbfierifghiebfbowebbfuiuiwrwbno7998re',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Endpoints
app.use('/', loginRouter);
app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/reservation', reservationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
