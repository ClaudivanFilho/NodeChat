var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var uuid = require('node-uuid');
var User = require('../models/user.model.js');

router.get('/login', function(req, res, next) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname+'/../public/login.html'));
  }
});

router.get('/auth/anonymous', function(req, res, next) {
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
    res.redirect("/");
  });
});

router.post('/auth/login', function(req, res, next) {
  passport.authenticate('local-signin', function(err, user, info) {
    if (err)
      return res.status(500).send("error no servidor");
    if (!user)
      return res.status(500).send(info.message);
    req.logIn(user, function(err) {
      if (err)
        return next(err);
      return res.status(200).send('login ok');
    });
  })(req, res, next);
});

router.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
  req.session.notice = "You have successfully been logged out!";
});

module.exports = router;
