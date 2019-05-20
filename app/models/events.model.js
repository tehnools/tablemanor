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