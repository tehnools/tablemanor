const User = require('../models/users.model.js');

exports.listUsers = function (req, res) {
    User.listAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};


exports.selectUser = function (req, res) {
    let data = req.params;
    User.select(data, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};


exports.createUser = function (req, res) {
    let userData = req.body;
    User.create(userData, function (err) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(201);
        }
    });
};


exports.overwrite = function (req, res) {
    User.update(req.body, req.user.id, function (err, result) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};


exports.delete = function (req, res) {
    User.remove(req.user.id, function (err) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(204)
        }
    });
};