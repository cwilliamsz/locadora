var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'locadora_hands_on_work'
});


/* GET Register page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/login.html')
});

// for action
router.post('/login', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  console.log(username, password)
  if (username && password) {
  // check if user exists
      connection.query('SELECT * FROM users WHERE email = ? OR username = ? AND password = ?', [username, username, password], function(error, results, fields) {
          if (results.length > 0) {
              request.session.loggedin = true;
              request.session.username = username;
              console.log("success")
              response.redirect('/home');
          } else {
              response.send('Incorrect Username and/or Password!');
          }           
          response.end();
      });
  } else {
      response.send('Please enter Username and Password!');
      response.end();
  }
});

module.exports = router;