const db = require('../../config/db.js');

exports.create = function (data, done) {
    let sql = "INSERT INTO placement (name, tableId, patronId) VALUES = ?"
    let values = [[
        data.name, data.tableId, data.patronId
    ]];

    db.get().query(sql, [values], (err) => {
        if (err) {
            return done(err);
        } else {
            return done();
        }
    })
}

exports.select = function (tableId, patronId, done) {
    let sql = "SELECT placement.id, placement.name AS placementName FROM placement WHERE placement.tableId = ? AND placement.patronId = ?"
    db.get().query(sql, [tableId, patronId], (err) => {
        if (err) {
            return done(err);
        } else {
            return done();
        }
    })
}

exports.delete = function (placementId, done) {
    let sql = "DELETE FROM placement WHERE placement.id = ?";
    db.get().query(sql, [placementId], (err) => {
        if (err) {
            return done(err);
        } else {
            return done();
        }
    })
}