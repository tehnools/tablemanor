// Local Imports
const db = require('../../config/db.js');

// External Imports
const moment = require('moment');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.validatePassword = function (password, hash) {
    if (bcrypt.compareSync(password, hash)) {
        return true;
    } else {
        return false;
    }
};

exports.generateJWT = function (id, email) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: email,
        id: id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}


exports.listAll = function (done) {
    db.get().query("SELECT * FROM users", function (err, rows) {
        console.log('select all');
        if (err) {
            return done(err)
        }
        return done(null, rows);
    });
};

exports.select = function (data ,done) {
    let userId = data.id;
    let query = "SELECT * FROM users where user_id=?";
    console.log("get a user: "+ query)
    db.get().query(query, [userId],function (err, rows) {
        console.log('user model');
        if (err) {
            return done(err)
        }
        return done(null, rows);
    });
};

exports.create = function (userData, done) {
    let query = "INSERT INTO users (email, name, password, create_time) VALUES ?";

    let  values = [[
        userData.email,
        userData.name,
        bcrypt.hashSync(userData.password, 10), // hash password
        moment().unix()
    ]];

    console.log(query);
    db.get().query(sql, [values], function (err, rows) {
        if (err) {
            return done(err)
        } else {
            return done();
        }
    });
};


exports.update = function (data, done) {
    let query = "UPDATE users SET email=?, password=?, name=?, update_time=? WHERE user_id=?";

    db.get().query(query, [user_id], function (err, rows) {
        if (err) {
            return done(err)
        } else {
            return done();
        }
    });
};

