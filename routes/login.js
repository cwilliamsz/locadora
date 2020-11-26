var express = require('express')
var router = express.Router()
var path = require('path')

const db = require('../config/connection')

router.get('/', function(request, response, next) {
  response.sendFile(path.join(__dirname, '../views', 'login.html'))
})

// Login action
router.post('/login', function(request, response) {
  var username = request.body.username
  var password = request.body.password

  if (username && password) {
    // check if user exists
    var query = 'SELECT * FROM admin WHERE email = ? OR username = ? AND password = ?'
    db.query(query, [username, username, password], function(error, results, fields) {
        if (results.length > 0) {
            request.session.user = username
            response.redirect('/home')
        } else {
            response.send('Incorrect Username and/or Password!')
        }           
        response.end()
    })
  } else {
      response.send('Please enter Username and Password!')
      response.end()
  }
})

// Logout action
router.get("/logout", function(request, response) {
  request.session.destroy(() => {
    response.redirect("/")
  })

  request.session = null
 })

module.exports = router