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

exports.update = function (eventId, patronId, data, done) {
    let sql = "UPDATE patron SET ";
    let columns = [];
    let values = [];

    if (data.firstName) {
        columns.push("firstName = ?");
        values.push(data.firstName);
    }
    if (data.middleName) {
        columns.push("middleName = ?");
        values.push(data.middleName);
    }
    if (data.lastName) {
        columns.push("lastName = ?");
        values.push(data.lastName);
    }
    if (data.age) {
        columns.push("age = ?");
        values.push(data.age);
    }
    if (data.email) {
        columns.push("email = ?");
        values.push(data.email);
    }
    if (data.contactable !== undefined) {
        columns.push("contactable = ?");
        values.push(data.contactable);
    }
    if (data.gender) {
        columns.push("gender = ?");
        values.push(data.gender);
    }

    sql += columns.join(",") + " WHERE patron.id = ? AND eventId = ?"
    db.get().query(sql, [...values, patronId, eventId], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows[0])
        };
    });
}