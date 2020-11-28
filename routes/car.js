var express = require('express')
var router = express.Router()

const db = require('../config/connection')

// Get
router.get('/', function(request, response, next) {
  if (request.session.user) {
    var sql='SELECT * FROM cars';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render('car', { title: 'Car List', data: data});
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

module.exports = router
