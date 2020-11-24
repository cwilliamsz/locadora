var express = require('express');
var router = express.Router();

var path = require('path');

/* GET Register page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.sendFile(__dirname + '/home.html')
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/');
  }
});

// Logout
router.get('/logout', function(req, res, next) {
  res.clearCookie('user_sid')
  req.logout()
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    } else {
      return res.redirect('/');
    }
  });
});

module.exports = router;
