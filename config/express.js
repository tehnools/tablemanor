// Standard Library Imports
const express = require('express');
const router = express.Router();
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
  require("../app/routes/users.routes")(router);
  require("../app/routes/auth.routes")(router);
  require("../app/routes/events.routes")(router);
  require("../app/routes/tables.routes")(router);
  require("../app/routes/patrons.routes")(router);
  app.use('/api/v1', router);
  require('./passport');

  // require("../app/routes/home.routes")(app);


  return app;
};