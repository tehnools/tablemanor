const User = require('../models/users.model.js');

exports.readAll = function (req, res) {
    User.listAll(function (err, result) {
        res.set({
            "Content-Type": "application/json"
        });
        if (err) {
            res.send({ "errorCode": err.code, "error": err.message })
        } else {
            res.send(result);
        }
    });
};


exports.write = function (req, res) {
    let userData = req.body;
    User.create(userData, function (err) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.send({ "errorCode": err.code, "error": err.message })
        } else {
            res.send(201)
        }
    });
};