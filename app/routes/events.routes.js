const Events = require("../controller/events.controller");
const passport = require("passport");

module.exports = (app) => {
    app.route('/events')
        .get(passport.authenticate('jwt', { session: false }), Events.listEvents)
        .post(passport.authenticate('jwt', { session: false }), Events.createEvent);
    app.route('/event/:id')
        .get(passport.authenticate('jwt', { session: false }), Events.selectEvent)
        .put(passport.authenticate('jwt', { session: false }), Events.updateEvent)
        .delete(passport.authenticate('jwt', { session: false }), Events.deleteEvent);
}