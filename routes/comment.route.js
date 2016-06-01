var express = require('express');
var router = express.Router();
var Book = require('../models/book.model.js');
var uuid = require('node-uuid');

router.get('/', function(req, res, next) {
  Book.find({}, 'comentarios', function (err, comentarios) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comentarios, null, 3));
  });
});

router.post('/', function(req, res, next) {
  var comentario = {};
  comentario._id = uuid.v4();
  comentario.nome = req.body.nome;
  comentario.texto = req.body.texto;
  Book.update(
    {_id: req.body.book_id},
    {$push: {"comentarios": comentario}},
    {upsert:true}, function(err){
    if (err) {
      res.send(err);
    } else {
      res.send('comment created');
    }
  });
});

router.put('/', function(req, res) {
  Book.update(
    {'comentarios._id': req.body._id},
    {'$set': {
        'comentarios.$.nome': req.body.nome,
        'comentarios.$.texto': req.body.texto
    }}, function(err) {
      res.send('comment edited');
    });
});

router.delete('/', function(req, res, next) {
  Book.update( {_id: req.body.book_id}, {$pull: {"_id": req.body._id }}, function(err) {
    res.send('comment deleted');
  });
});

module.exports = router;
