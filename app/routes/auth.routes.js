const Auth = require("../controller/auth.controller");
const passport = require("passport");

module.exports = (app) => {
    app.route('/login')
        // .post(Auth.login)
        .post(Auth.login);
    app.route('/logout')
         .post(Auth.logout);
}