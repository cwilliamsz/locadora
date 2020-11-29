var express = require('express')
var router = express.Router()

const db = require('../config/connection')

// Get
router.get('/', function(request, response, next) {
  if (request.session.user) {
    var sql='SELECT c.id, c.year, c.model as model_id, m.description as model, c.code, c.observation, m.brand as brand_id, b.description as brand, cl.name as cor FROM cars c JOIN models m ON m.id = c.model JOIN brands b ON b.id = m.brand  JOIN colors cl ON cl.id = c.color';

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
