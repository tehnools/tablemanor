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

exports.create = function (eventId, data, done) {
    let sql = "INSERT INTO patron (firstName, eventId, middleName, lastName, age, email, contactable, gender) VALUES ?";

    // Sanitization
    if (data.gender.toUpperCase() !== 'M' && data.gender.toUpperCase() !== "F") return done(errorBadRequestGender);
    if (!data.firstName) return done(errorBadRequestFirstName);
    if (!data.email && data.contactable) return done(errorBadRequestContactable);

    let values = [[
        data.firstName,
        eventId,
        data.middleName,
        data.lastName,
        data.age,
        data.email,
        data.contactable,
        data.gender
    ]];

    db.get().query(sql, [values], (err) => {
        if (err) {
            return done(err);
        } else {
            return done();
        }
    })
}

exports.select = function (eventId, patronId, done) {
    let sql = "SELECT firstName, eventId, middleName, lastName, age, email, contactable, gender FROM patron WHERE id=? AND eventId = ?";
    db.get().query(sql, [eventId, patronId], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows[0])
        };
    });
}
