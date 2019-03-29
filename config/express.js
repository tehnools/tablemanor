// Standard Library Imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

module.exports = function () {
  const app = express();
  app.use(bodyParser.json());
  app.use(session({ secret: 'password', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

  // Routes
  require("../app/routes/user.routes")(app);
  // require("../app/routes/auth.routes")(app);
  // require("../app/routes/home.routes")(app);

  return app;
};