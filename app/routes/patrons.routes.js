const Patrons = require("../controller/patrons.controller");
const passport = require('passport');

module.exports = (app) => {
    app.route('/event/:eventId/patrons')
        .get(passport.authenticate('jwt', { session: false }), Patrons.listPatrons)
        .post(passport.authenticate('jwt', { session: false }), Patrons.createPatron);
    app.route('/event/:eventId/patron/:patronId')
        .get(passport.authenticate('jwt', { session: false }), Patrons.selectPatron)