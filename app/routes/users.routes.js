const Users = require("../controller/user.controller");
const passport = require('passport');

module.exports = (app) => {
    app.route('/users/v1/users')
        .get(Users.listUsers)
        .post(Users.createUser);
    app.route('/users/v1/users/:id')
        .get(passport.authenticate('jwt', { session: false }),
            Users.selectUser)
        .put(passport.authenticate('jwt', { session: false }),
        Users.overwrite);
}