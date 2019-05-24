const Tables = require("../controller/tables.controller");
const passport = require('passport');

module.exports = (app) => {
    app.route('/event/:eventId/tables')
        // .get(Tables.listTables)
        .post(passport.authenticate('jwt', { session: false }), Tables.createTable);
    // app.route('/users/v1/user/:id')
    //     .get(passport.authenticate('jwt', { session: false }),
    //         Tables.selectUser)
    //     .put(passport.authenticate('jwt', { session: false }),
    //         Tables.overwrite)
    //     .delete(passport.authenticate('jwt', { session: false }),
    //         Tables.delete);
}