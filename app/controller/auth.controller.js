// const jwt = require('express-jwt')
const db = require('../../config/db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment');

exports.login = function (req, res) {
    // Check Fields
    if (!req.body.email || !req.body.password) return res.status(401).send('Incomplete Fields');

    let sql = "SELECT * FROM Users where email=?";
    db.get().query(sql, [req.body.email], (err, rows) => {
        if (err) { res.status(500).send(err) }
        const result = rows[0];
        if (result.passport === req.body.passport && result.id) {
            const payload = {
                sub: result.user_id,
                iat: moment().unix()
            }
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY,{expiresIn: '1d'});
            res.send(token);
        } else {
            return res.status(400).send()
        }
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.send(201, "Logout Sucessful");
};