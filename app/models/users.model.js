// Local Imports
const db = require('../../config/db.js');

// External Imports
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listAll = function(done){
    db.get().query("SELECT * FROM users", function (err, rows) {
        console.log('user model');
        if (err) {
            return done({"500": "SERVER FAILED REQUEST"})
        }
        return done(rows);
    });
};

exports.create = function(userData ,done){
    let sql = "INSERT INTO users (email, name, password, create_time) VALUES ?";

    let query = [[
        userData.email,
        userData.name,
        bcrypt.hashSync(userData.password, 10),
        moment().unix()
    ]];
    
    console.log(query);
    db.get().query(sql, [query], function (err, rows) {
        if (err) {
            return done({"500": err})
        } else {
            return done(rows);
        }
    });
};