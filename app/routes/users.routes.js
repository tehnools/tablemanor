const Users = require("../controller/user.controller");

module.exports = (app) => {
    app.route('/users/v1/users')
        .get(Users.readAll)
        .post(Users.write);
}