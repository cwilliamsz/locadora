var express = require('express')
var router = express.Router()

const db = require('../config/connection')

// Get
router.get('/', function(request, response, next) {
  if (request.session.user) {
    var sql='SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render('user', { title: 'User List', data: data});
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Insert
router.post('/create', function(request, response) {
  if (request.session.user) {
    const user = request.body
    var sql = 'INSERT INTO users SET ?'

    db.query(sql, user, function (err, result) { 
        if (err) throw err
          console.log("User data is inserted successfully ")
          console.log(result)
          response.redirect('/user')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Delete
router.get('/delete/:id', function(request, response) {
  if (request.session.user) {
    const userId = request.params.id
    var sql = 'DELETE FROM users WHERE id = ?'

    db.query(sql, userId, function (err, result) { 
        if (err) throw err
          console.log("User data is deleted successfully ")
          console.log(result)
          response.redirect('/user')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Update
router.get('/edit/:id', (req, res) => {
  if (request.session.user) {
    const userId = request.params.id
    // var sql = 'DELETE FROM users WHERE id = ?'

    // db.query(sql, userId, function (err, result) { 
    //     if (err) throw err
    //       console.log("User data is deleted successfully ")
    //       console.log(result)
    //       response.redirect('/user')
    // })

    response.redirect('/user')

  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
});

module.exports = router
