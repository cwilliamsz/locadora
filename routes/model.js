var express = require('express')
var router = express.Router()

const db = require('../config/connection')

// Get
router.get('/', function(request, response, next) {
  if (request.session.user) {
    
    var sql='SELECT * FROM models';
    db.query(sql, function (err, models, fields) {
      if (err) throw err;
      
      var sqlBrands='SELECT * FROM brands';
      db.query(sqlBrands, function (err, brands, fields) {
        if (err) throw err;
        response.render('model',  { title: 'Model List', 
                                  data: models,
                                  brands: brands
                                });
      });
    });
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Insert
router.post('/create', function(request, response) {
  if (request.session.user) {
    const model = request.body
    
    var sql = 'INSERT INTO models SET ?'
    db.query(sql, model, function (err, result) { 
        if (err) throw err
          console.log("model data is inserted successfully")
          console.log(result)
          response.redirect('/model')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Delete
router.get('/delete/:id', function(request, response) {
  if (request.session.user) {
    const modelId = request.params.id
    
    var sql = 'DELETE FROM models WHERE id = ?'
    db.query(sql, modelId, function (err, result) { 
        if (err) throw err
          console.log("model data is deleted successfully ")
          console.log(result)
          response.redirect('/model')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

// Update
router.get('/edit/:id', (request, response) => {
  if (request.session.user) {
    const modelId = request.params.id
    
    var sql='SELECT * FROM models WHERE id = ?';
    db.query(sql, modelId, function (err, modelDetail, fields) {
      if (err) throw err;
      
      var sqlAllModels='SELECT * FROM models';
      db.query(sqlAllModels, function (err, data, fields) {
        if (err) throw err;
        
        var sqlAllBrands='SELECT * FROM brands';
        db.query(sqlAllBrands, function (err, brands, fields) {
        if (err) throw err;
          response.render('model/edit',  { title: 'Edit model', 
                                          modelDetail: modelDetail,
                                          data: data,
                                          brands: brands
                                        });
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
    const model = request.body
    var id = model.id
    delete model.id
    
    var sql = 'UPDATE models SET ? WHERE id = '
    db.query(sql + id, model, function (err, result) { 
        if (err) throw err
          console.log("model data is updated successfully")
          console.log(result)
          response.redirect('/model')
    })
  } else {
    request.session.error = 'Access denied!'
    response.redirect('/')
  }
})

module.exports = router
