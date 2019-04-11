// const jwt = require('express-jwt')
const db = require('../../config/db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment');

exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) return res.status(401).send('Incomplete Fields');
    let sql = "SELECT * FROM Users where email=?";
    db.get().query(sql, [req.body.email], (err, rows) => {
        if (err) { res.status(500).send(err) }
        const result = rows[0];
        if (result.passport == req.body.passport) {
            const payload = {
                sub: result.user_id,
                exp: moment().add(5, 'hours').unix(),
                iat: moment().unix()
            }
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
            res.send(token);
        } else {
            return res.status(400).send()
        }
    });
};



exports.logout = function (req, res) {
    console.log("BEFORE" + req.user);
    req.session.destroy();
    console.log("AFTER " + req.user);
    //todo makes sure check if session is destroyed
    // jwt({secret: process.env.PUBLIC_KEY})
    // console.log(req.user)
    // if (!req.user){
    //     res.send(401, {message: "Email or password is incorrect"})
    // }
    res.send(201, "Logout Sucessful");
};