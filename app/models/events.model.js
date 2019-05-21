const db = require('../../config/db.js');

// External Imports
const moment = require('moment');

exports.listAll = function (userId, done) {
    let sql = "SELECT id, name, type, userId FROM EVENTS WHERE userId = ?";

    db.get().query(sql, [userId], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows);
        }
    });
}

exports.create = function (data, done) {
    let sql = "INSERT INTO events (name, userId, type ,createTime) VALUES ?";
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

exports.select = function (userId, done) {
    let sql = "SELECT * FROM EVENTS WHERE id=?";
    db.get().query(sql, userId, (err, rows) => {
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
    if (data.userId) columns.push({ name: "userId", value: data.userId });
    // values.push({ name: "updateTime", value: moment().unix() });

    // Add columns to be updated
    for (let column of columns) {
        sql += `${column.name} =  ?, `;
        values.push(column.value);
    }
    sql += `updateTime = ${moment().unix()} WHERE id = ?`;
    db.get().query(sql, [...values, data.id], (err, rows) => {
        if (err) {
            return done(err);
        } else {
            return done(null, rows[0])
        };
    });
}

exports.delete = function(id, done){
    let sql = "DELETE FROM events WHERE id=?";

    db.get().query(sql, [id], (err)=>{
        if (err){
            return done(err);
        } else {
            return done()
        }
    });
}