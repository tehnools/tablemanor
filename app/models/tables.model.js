const db = require('../../config/db.js');


exports.listAll = function (eventId, done) {
    let sql = "SELECT tables.id, tables.name AS tableName, size, eventId, events.name AS eventName FROM tables LEFT JOIN events ON tables.eventId = events.id AND eventId = ?";

    db.get().query(sql, [eventId], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows);
        }
    });
}

exports.create = function (eventId, data, done) {
    let sql = "INSERT INTO tables (name, size, eventId) VALUES ?";
    let values = [[
        data.name,
        data.size,
        eventId
    ]];
    db.get().query(sql, [values], (err) => {
        if (err) {
            return done(err);
        } else {
            return done();
        }
    })
}

exports.select = function (eventId, tableId, done) {
    let sql = "SELECT id, name, size, eventId FROM tables WHERE id=? AND eventId = ?";
    db.get().query(sql, [eventId, tableId], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows[0])
        };
    });
}

exports.delete = function(eventId, tableId, done){
    let sql = "DELETE FROM tables WHERE id=? AND eventId = ?";
    db.get().query(sql, [tableId, eventId], (err)=>{
        if (err){
            return done(err);
        } else {
            return done()
        }
    });
}