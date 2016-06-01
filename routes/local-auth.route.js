var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/login', function(req, res, next) {
  return res.sendFile(path.join(__dirname+'/../public/login.html'));
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
