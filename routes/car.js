var express = require('express')
var router = express.Router()
var path = require('path')

router.get('/', function(request, response, next) {
  response.sendFile(path.join(__dirname, '../views', 'car.html'))
})

module.exports = router
