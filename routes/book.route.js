var express = require('express');
var router = express.Router();
var Book = require('../models/book.model.js');

router.get('/', function(req, res, next) {
  Book.find({}, function(err, books) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(books, null, 3));
  });
});

router.post('/', function(req, res, next) {
  var book = new Book(req.body);
  book.save(function() {
    res.send("book created");
  });
});

router.put('/', function(req, res, next) {
  Book.update(
    {_id : req.body._id },
    req.body, function(err){
      Book.findOne({_id : req.body._id}, function(err, book) {
        res.json(book);
      });
    });
});

router.delete('/', function(req, res, next) {
  Book.remove({_id : req.body._id }, function(err) {
  });
  res.send("book deleted");
});

router.get('/:id', function(req, res, next) {
  Book.findOne({_id : req.params.id}, function(err, book) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(book, null, 3));
  });

});

module.exports = router;
