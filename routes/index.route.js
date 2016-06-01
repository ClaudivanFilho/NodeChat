var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');
var uuid = require('node-uuid');
var User = require('../models/user.model.js');
var Chat = require('../models/chat.model.js');

router.get('/', function(req, res, next) {
  // cria um usuário teste
  if (!req.user) {
    var my_id = uuid.v4();
    var user = new User({
      id : my_id,
      displayName : "Usuário" + my_id.substring(0,5),
      provider : "NodeJs"
    });
    user.save(function() {});
    req.logIn(user, function(err) {
      console.log("log in");
      if (err)
        return next(err);
    });
  }
  res.sendFile(path.join(__dirname+'/../public/home.html'));
});

router.get('/home', function(req, res, next) {
  return res.sendFile(path.join(__dirname+'/../public/home.html'));
});

router.get('/backdoor', function(req, res, next) {
  User.remove(function() {
    Chat.remove(function(){

    });
  });
  return res.send("Database Reseted");
});

module.exports = router;
