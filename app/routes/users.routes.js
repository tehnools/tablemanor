const Users = require("../controller/user.controller");
const passport = require('passport');

module.exports = (app) => {
    app.route('/users')
        .get(Users.listUsers)
        .post(Users.createUser);
    app.route('/user/:id')
        .get(passport.authenticate('jwt', { session: false }),
            Users.selectUser)
        .put(passport.authenticate('jwt', { session: false }),
            Users.overwrite)
        .delete(passport.authenticate('jwt', { session: false }),
            Users.delete);
}