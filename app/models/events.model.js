const db = require('../../config/db.js');

// External Imports
const moment = require('moment');

exports.listAll = function (user_id, done) {
    let sql = "SELECT id, name, type, user_id FROM EVENTS WHERE user_id = ?";

    db.get().query(sql, [user_id], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows);
        }
    });
}

exports.create = function (data, done) {
    let sql = "INSERT INTO events (name, user_id, type ,create_time) VALUES ?";
    let values = [[
        data.name,
        data.id,
        data.type,
        moment().unix()
    ]];
    db.get().query(sql, [values], (err) => {
        if (err) {
            return done(err);
        } else {
            return done();
        }
    })
}

exports.select = function (event_id, done) {
    let sql = "SELECT * FROM EVENTS WHERE id=?";
    db.get().query(sql, event_id, (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows[0])
        };
    });
}

exports.update = function (data, done) {
    let sql = "UPDATE events SET ";
    let columns = [];
    let values = [];

    // Add columns that exist in Data
    if (data.name) columns.push({ name: "name", value: data.name });
    if (data.type) columns.push({ name: "type", value: data.type });
    if (data.userId) columns.push({ name: "user_id", value: data.userId });
    // values.push({ name: "update_time", value: moment().unix() });

    // Add columns to be updated
    for (let column of columns) {
        sql += `${column.name} =  ?, `;
        values.push(column.value);
    }
    sql += `update_time = ${moment().unix()} WHERE id = ?`;
    db.get().query(sql, [...values, data.id], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows[0])
        };
    });
}