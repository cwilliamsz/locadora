var express = require('express');
var router = express.Router();
const db = require('../config/connection')

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/user.html')
});

router.post('/create', function(request, response) {
  const user = request.body;
  var sql = 'INSERT INTO users SET ?';

  db.query(sql, user, function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
         response.redirect('/user');
  });
});

module.exports = router;
