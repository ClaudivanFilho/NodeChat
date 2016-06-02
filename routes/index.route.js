var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');
var uuid = require('node-uuid');
var User = require('../models/user.model.js');
var Chat = require('../models/chat.model.js');

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.sendFile(path.join(__dirname+'/../public/home.html'));
  }
});

router.get('/backdoor', function(req, res, next) {
  User.remove(function() {
    Chat.remove(function(){

    });
  });
  return res.send("Database Reseted");
});

module.exports = router;
