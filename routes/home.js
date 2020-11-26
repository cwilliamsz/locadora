var express = require('express')
var router = express.Router()
var path = require('path')

router.get('/', function(request, response, next) {
  if (request.session.user) {
    response.sendFile(path.join(__dirname, '../views', 'home.html'))
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

module.exports = router
