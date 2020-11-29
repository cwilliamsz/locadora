var express = require('express')
var router = express.Router()

const db = require('../config/connection')

// Get
router.get('/', function(request, response, next) {
  if (request.session.user) {
    var sql='SELECT * FROM brands';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render('brand', { title: 'Brand List', data: data});
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Insert
router.post('/create', function(request, response) {
  if (request.session.user) {
    const brand = request.body
    var sql = 'INSERT INTO brands SET ?'
    db.query(sql, brand, function (err, result) { 
        if (err) throw err
          console.log("Brand data is inserted successfully")
          console.log(result)
          response.redirect('/brand')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Delete
router.get('/delete/:id', function(request, response) {
  if (request.session.user) {
    const brandId = request.params.id
    var sql = 'DELETE FROM brands WHERE id = ?'

    db.query(sql, brandId, function (err, result) { 
        if (err) throw err
          console.log("Brand data is deleted successfully ")
          console.log(result)
          response.redirect('/brand')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Update
router.get('/edit/:id', (request, response) => {
  if (request.session.user) {
    const brandId = request.params.id
    var sql='SELECT * FROM brands WHERE id = ?';
    db.query(sql, brandId, function (err, brandDetail, fields) {
      if (err) throw err;
      var sqlAllBrands='SELECT * FROM brands';
      db.query(sqlAllBrands, function (err, data, fields) {
      if (err) throw err;
        response.render('brand/edit',  { title: 'Edit Brand', 
                                        brandDetail: brandDetail,
                                        data: data
                                      });
      });
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
});

router.post('/update', function(request, response) {
  if (request.session.user) {
    const brand = request.body
    console.log('brand', brand)
    var id = brand.id
    delete brand.id
    var sql = 'UPDATE brands SET ? WHERE id = '
    db.query(sql + id, brand, function (err, result) { 
        if (err) throw err
          console.log("Brand data is updated successfully")
          console.log(result)
          response.redirect('/brand')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

module.exports = router
