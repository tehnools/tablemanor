const express = require('express'),
  bodyParser = require('body-parser');

// const cookieParser = require('cookie-parser');
// const session = require('express-session');


module.exports = function () {
  const app = express();
  app.use(bodyParser.json());

  require("../app/routes/user.routes.js")(app);
  require("../app/routes/project.routes")(app);

  return app;
};