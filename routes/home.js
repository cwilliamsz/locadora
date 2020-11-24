var express = require('express');
var router = express.Router();

var path = require('path');

/* GET Register page. */
router.get('/', function(req, res, next) {
  if (request.session.loggedin) {
      console.log('Welcome back, ' + req.session.username + '!');
      res.sendFile(__dirname + '/home.html')
  } else {
      res.send('Please login to view this page!');
  }
  res.end();
});

module.exports = router;
