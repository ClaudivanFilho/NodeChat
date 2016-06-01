var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');

router.get('/user', function(req, res, next) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json("Not user");
  }
});

router.get('/users', function(req, res, next) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;
