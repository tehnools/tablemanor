// Local Imports
const db = require('../../config/db.js');

// External Imports
const moment = require('moment');
const bcrypt = require('bcrypt');
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
    let sql = "SELECT * FROM users where user_id=?";
    db.get().query(sql, [userId],function (err, rows) {
        console.log('user model');
        if (err) {
            return done(err)
        }
        return done(null, rows);
    });
};

exports.create = function (data, done) {
    let sql = "INSERT INTO users (email, name, password, create_time) VALUES ?";

    let  values = [[
        data.email,
        data.name,
        bcrypt.hashSync(data.password, 10),
        moment().unix()
    ]];
    db.get().query(sql, [values], function (err, rows) {
        if (err) {
            return done(err)
        } else {
            return done();
        }
    });
};


exports.update = function (data, userId, done) {
    let sql = "UPDATE users SET  email=?, password=?, name=?, update_time=? WHERE user_id=?";
    let values = [
        data.email,
        data.password,
        data.name,
        moment().unix(),
        userId
    ];

    db.get().query(sql, values, function (err, rows, fields) {
        console.log(rows,fields)
        if (err) {
            return done(err)
        } else {
            let newUserData = {
                email: values[0],
                password: values[1],
                name : values[2],
                update_time: values[3]
            }
            return done(null, newUserData);
        }
    });
};

