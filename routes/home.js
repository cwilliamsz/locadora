var express = require('express')
var router = express.Router()

var path = require('path')

router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.sendFile(__dirname + '/home.html')
  } else {
    req.session.error = 'Access denied!'
    res.redirect('/')
  }
})

module.exports = router
