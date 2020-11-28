var express = require('express')
var router = express.Router()

const db = require('../config/connection')

// Get
router.get('/', function(request, response, next) {
  if (request.session.user) {
    var sql='SELECT * FROM cars';
    db.query(sql, function (err, cars, fields) {
      if (err) throw err;
      var sqlColors='SELECT * FROM colors';
      db.query(sqlColors, function (err, colors, fields) {
        if (err) throw err;
        response.render('car',  { title: 'Car List', 
                                  data: cars,
                                  colors: colors
                                });
      });
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

module.exports = router
