const Tables = require("../controller/tables.controller");
const passport = require('passport');

module.exports = (app) => {
    app.route('/event/:eventId/tables')
        .get(passport.authenticate('jwt', { session: false }), Tables.listTables)
        .post(passport.authenticate('jwt', { session: false }), Tables.createTable);
    app.route('/event/:eventId/table/:tableId')
        .get(passport.authenticate('jwt', { session: false }), Tables.selectTable)
        .delete(passport.authenticate('jwt', { session: false }), Tables.deleteTable);
}