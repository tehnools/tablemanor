const db = require('../../config/db.js');


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