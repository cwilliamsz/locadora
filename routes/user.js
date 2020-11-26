var express = require('express')
var router = express.Router()

const db = require('../config/connection')

router.get('/', function(request, response, next) {
  if (request.session.user) {
    var sql='SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render('user', { title: 'User List', userData: data});
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

router.post('/create', function(request, response) {
  if (request.session.user) {
    const user = request.body
    var sql = 'INSERT INTO users SET ?'

    db.query(sql, user, function (err, data) { 
        if (err) throw err
          console.log("User data is inserted successfully ") 
          response.redirect('/user')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

router.get('/delete/:id', function(request, response) {
  if (request.session.user) {
    const userId = request.params.id
    var sql = 'DELETE FROM users WHERE id = ?'

    db.query(sql, userId, function (err, data) { 
        if (err) throw err
          console.log("User data is deleted successfully ") 
          response.redirect('/user')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

module.exports = router
