// const jwt = require('express-jwt')
const db = require('../../config/db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment');

exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) return res.status(401).send('Incomplete Fields');
    //TODO figure out why promise is not returnig a result
    let query = "SELECT * FROM Users where email=?";
    db.get().query(query, [req.body.email])
        .then(rows => {
            const result = rows[0];
            passport.authenticate('local', result.email, result.password).then(user => {
                const payload = {
                    sub: user.user_id,
                    exp: moment().add(5, 'hours').unix(),
                    iat: moment().unix()
                }
                const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
                res.send(token);
            }).catch(err => {
                return res.status(401).send({ err: err })
            });
        })
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