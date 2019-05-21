// Local Imports
const db = require('./db.js');
const users = require('../app/models/users.model.js');

// External Imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const moment = require('moment');

const localStrategy = new LocalStrategy({
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
});

const jwtStrategy = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
}, function (jwt_payload, done) {
  // Expiration Check
  if (moment().unix() > jwt_payload.exp) {
    return done(null, false, { message: 'Login expired.' })
  }

  // Select User
  let query = "SELECT * FROM Users where id=?";
  db.get().query(query, [jwt_payload.sub], function (err, rows) {
    if (err) {
      return done({ "500": "SERVER FAILED REQUEST" })
    }
    if (!rows[0]) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, rows[0]);
  });
})

passport.use(jwtStrategy);
passport.use(localStrategy);

passport.serializeUser(function (user, done) {
  done(null, user.userId);
});


passport.deserializeUser(function (id, done) {
  let query = "SELECT * FROM Users where id=?";

  db.get().query(query, [id], function (err, rows) {
    return done(err, rows[0])
  });
});