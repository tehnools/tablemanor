const Auth = require("../controller/auth.controller");

module.exports = (app) => {
    app.route('/login')
        .post(Auth.login);
    app.route('/logout')
        .post(Auth.logout);
}