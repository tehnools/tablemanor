const Placements = require("../controller/placements.controller");
const passport = require('passport');

module.exports = (app) => {
    app.route('/placements')
        .post(passport.authenticate('jwt', { session: false }), Placements.createPlacement);
    app.route('/placement/:id')
        .get(passport.authenticate('jwt', { session: false }), Placements.selectPlacement)
        .delete(passport.authenticate('jwt', { session: false }), Placements.deletePlacement);
}