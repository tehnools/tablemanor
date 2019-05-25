const db = require('../../config/db.js');

const errorBadRequestGender = { code: 400, message: "Bad Request - Your request does not fit the requirement 'M' or 'F'" }
const errorBadRequestFirstName = { code: 400, message: "Bad Request - Missing parameters Firstname" }
const errorBadRequestContactable = { code: 400, message: "Bad Request - Missing parameters Email when person is Contactble" }

exports.listAll = function (eventId, done) {
    let sql = "SELECT patron.id AS patronId, firstName, middleName, lastName, email, tables.name AS assignedTable FROM patron LEFT JOIN tables ON patron.eventId = tables.eventId AND patron.eventId = ?";
    // let sql = "SELECT tables.id, tables.name AS tableName, size, eventId, events.name AS eventName FROM tables LEFT JOIN events ON tables.eventId = events.id AND eventId = ?";

    db.get().query(sql, [eventId], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows);
        }
    });
}
