var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
const { brotliDecompress } = require('zlib');
const { db } = require('../models/Produto');
var Produto = mongoose.model('Produto');
var csvfile = __dirname + "/../public/files/car-consume.csv";
var stream = fs.createReadStream(csvfile);
const ObjectId = require("mongodb").ObjectID;
var csvexpress = require('csv-express');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Importando arquivo CSV usando NodeJS.' });
}).get('/import', function (req, res, next) {
  var produto = []
  var csvStream = csv()
    .on("data", function (data) {
      var item = new Produto({
       
        distance: data[0],
        consume: data[1],
        speed: data[2],
        temp_inside: data[3],
        temp_outside: data[4],
        specials: data[5]
      
      });
      item.save(function (error) {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    }).on("end", function () {
      console.log(" Fim do arquivo de importação.");
    });
  stream.pipe(csvStream);
  res.json({ success: "Os dados foram importados com sucessos.", status: 200 });
})

  .get('/fetchdata', function (req, res, next) {

    Produto.find({}, function (err, docs) {

      if (!err) {

        res.json({ success: "Atualização finalizada.", status: 200, data: docs });

      } else {

        throw err;

      }

    });

  }).get('/delete/:id', function(req, res, next){
    var id = req.params.id;

    Produto.remove({_id: ObjectId(id)}, (err, result) => {
      if(err) return res.send(500, err)
      console.log('Deletado com sucesso!')
      res.redirect("/")
    })
  })
  router.get('/edit/:id', function(req, res){
    Produto.findById(req.params.id, function(err, article){
      res.render('edit', {
        article: article
      });
    });
  })
  .post('/edit/:id', function(req, res, next){
    let article = {};
    article.distance = req.body.distance;
    article.consume = req.body.consume;
    article.speed = req.body.speed;
    article.temp_inside = req.body.temp_inside;
    article.temp_outside = req.body.temp_outside;
    article.specials = req.body.specials;

  
    let query = {_id: req.params.id};
    
    console.log(article)
    Produto.update(query, article, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/');
      }
    })
  });

  router.get('/add', function(req, res){
    res.render('add', {
      title: 'Inserir Dados:'
    });
  })
  
  .post('/add', function(req, res, next){
      let article = new Produto();
      article.distance = req.body.distance;
      article.consume = req.body.consume;
      article.speed = req.body.speed;
      article.temp_inside = req.body.temp_inside;
      article.temp_outside = req.body.temp_outside;
      article.specials = req.body.specials;
  
      article.save(function(err){
        if(err) {
          console.error(err);
          return;
        } else {
          res.redirect('/');
        }
      });
    })
    .get('/export', function (req, res, next) {
      var filename = "produto_exportado.csv";
      var dataArray;
      Produto.find().lean().exec({}, function (err, produto) {
      if (err) res.send(err);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader("Content-Disposition", 'attachment; filename=' + filename);
      res.csv(produto, true);
      console.log(produto);
      console.log("Os dados foram exportados com sucesso.");
      });
      })
    ;

module.exports = router;