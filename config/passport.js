// Local Imports
const db = require('./db.js');
const users = require('../app/models/users.model.js');

// External Imports
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
let query = "SELECT * FROM Users where email=?";

  db.get().query(query, [email], function (err, rows) {
    if (err) {
      return done({ "500": "SERVER FAILED REQUEST" })
    }
    if (!rows[0] || !users.validatePassword(password, rows[0].password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, rows[0])
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});


passport.deserializeUser(function(id, done) {
  let query = "SELECT * FROM Users where user_id=?";

  db.get().query(query, [id], function (err, rows) {
    return done(err, rows[0])
  });
});