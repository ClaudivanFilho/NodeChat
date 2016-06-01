var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./../models/user.model.js');

passport.use(new FacebookStrategy({
    clientID: "290046521330776",
    clientSecret: "d324100182cb0c1bc4d41595e45d5f02",
    callbackURL: "http://lastchat.herokuapp.com/auth/facebook/callback",
    profileFields: ['emails', 'displayName', 'gender', 'name', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({id : profile.id}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        var usuario = new User({
          id : profile.id,
          displayName : profile.displayName,
          provider : profile.provider,
          gender : profile.gender,
          photos : profile.photos
        });
        usuario.save(function() {
          done(null, usuario);
        });
      } else {
        done(null, user);
      }
    });
  }
));

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  return (passport, app);
}
