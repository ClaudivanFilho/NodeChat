var express = require('express');
var path = require('path');
var router = express.Router();
//var passport = require('passport');
//var Book = require('../models/book.model.js');
//var Populate = require('../models/populate.js');

router.get('/register', function(req, res, next) {
  return res.sendFile(path.join(__dirname+'/../public/register.html'));
});


module.exports = router;
