const db = require('../../config/db.js');

// External Imports
const moment = require('moment');

exports.create = function (data, done) {
    let sql = "INSERT INTO events (name, user_id, type ,create_time) VALUES ?";
    let values = [[
        data.name,
        data.id,
        data.type,
        moment().unix()
    ]]
    db.get().query(sql, [values], (err) => {
        if (err) {
            return done(err)
        } else {
            return done();
        }
    })
}