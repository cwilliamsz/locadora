var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/user.html')
});

router.post('/create', function(request, response) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'locadora_hands_on_work'
  });

  const user = request.body;
  var sql = 'INSERT INTO users SET ?';

  connection.query(sql, user, function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
         response.redirect('/user');
  });
});

module.exports = router;
