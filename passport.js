/*jshint esversion:6 */
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
let db = require('./models');
let Users = db.users;

module.exports = function() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    Users.findById(userId).then(data => done(null, data)).catch(err => {
      done(err, false);
    });
  });

  passport.use(
    'local',
    new LocalStrategy(function(username, password, done) {
      Users.findOne({ where: { name: username } })
        .then(user => {
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) return done(null, user);
            return done(null, false);
          });
        })
        .catch(err => { return done(err); } );
    })
  );
};