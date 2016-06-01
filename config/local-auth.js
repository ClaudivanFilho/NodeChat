var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../models/user.model.js');

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    process.nextTick(function() {
    //Empresa.findOne({ email: email, senha:password }, function (err, empresa) {
    //  if (err) { return done(err); }
    //  if (!empresa) {
    //    return done(null, false, { message: 'Incorrect email or password.' });
    //  }
    //  return done(null, empresa);
    //});
    });
  }
));

passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user, done) {done(null, user);});

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  return (passport, app);
}
