// Standard Library Imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

// External Imports
const passport = require('passport');

module.exports = function () {
  // Init App
  const app = express();

  // Configure Middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({ secret: 'password', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  
  // Routes
  require("../app/routes/users.routes")(app);
  require("../app/routes/auth.routes")(app);
  require('./passport');

  // require("../app/routes/home.routes")(app);


  return app;
};