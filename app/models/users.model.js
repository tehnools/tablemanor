const db = require('../../config/db.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.listAll = function(done){
    db.get().query("SELECT * FROM user", function (err, rows) {
        console.log('user model');
        if (err) {
            return done({"500": "SERVER FAILED REQUEST"})
        }
        return done(rows);
    });
};