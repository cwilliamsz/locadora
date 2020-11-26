var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/login.html')
});

// Login action
router.post('/login', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'locadora_hands_on_work'
    });
    
    // check if user exists
    var query = 'SELECT * FROM admin WHERE email = ? OR username = ? AND password = ?'
    connection.query(query, [username, username, password], function(error, results, fields) {
        if (results.length > 0) {
            request.session.user = username;
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

// Logout action
router.get("/logout", function(req, res) {
 req.session.destroy(() => {
   res.redirect("/")
  });

  req.session = null
 });

module.exports = router;