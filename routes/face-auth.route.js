var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate(
  'facebook', { successRedirect: '/home', failureRedirect: '/login' }));

module.exports = router;
