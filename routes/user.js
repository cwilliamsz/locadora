var express = require('express');
var router = express.Router();

var path = require('path');

/* GET Register page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/user.html')
});

module.exports = router;
