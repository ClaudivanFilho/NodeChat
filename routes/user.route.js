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

router.put('/user', function(req, res, next) {
  User.update(
    {id : req.user.id },
    req.body, function(err){
      User.findOne({id : req.user.id}, function(err, user) {
        res.json(user);
      });
    });
});

router.get('/users', function(req, res, next) {
  if (req.query.kilometers) {
    var maxDistance = req.query.kilometers;
    console.log(maxDistance);
    maxDistance /= 6371;
    console.log(maxDistance);
    User.findOne({id : req.user.id}, function(err, user) {
      console.log(user.location);
      if (err) {
        res.send(err);
      } else {
        User.find({
          location : {
            $geoWithin: { $centerSphere: [ user.location , maxDistance] }
          }
        }, function(err, users) {
          if (err) { res.send(err); } else { res.json(users); }
        });
      }
    });
  } else {
    User.find({}, function(err, users) {
      res.json(users);
    });
  }
});

module.exports = router;
