var express = require('express');
var path = require('path');
var router = express.Router();
var User = require('../models/user.model.js');
var Chat = require('../models/chat.model.js');
var fs = require('fs');
var async = require('async');

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.sendFile(path.join(__dirname+'/../public/home.html'));
  }
});

router.get('/populate', function(req, res, next) {
  var data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data.json'), 'utf8'));
  async.each(data, function(item, callback) {
    User.create(item, callback);
  }, function(err) {
    if (err) throw err;
  });
  return res.send("Database Populated");
});

router.get('/backdoor', function(req, res, next) {
  User.remove(function() {
    Chat.remove(function(){
    });
  });
  return res.send("Database Reseted");
});

module.exports = router;
