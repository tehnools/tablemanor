const User = require('../models/users.model.js');

exports.listUsers = function (req, res) {
    User.listAll(function (err, result) {
        res.set({
            "Content-Type": "application/json"
        });
        if (err) {
            res.send(500, err)
        } else {
            res.send(result);
        }
    });
};


exports.selectUser = function (req, res) {
    let data = req.params;

    User.select(data, function (err, result) {
        res.set({
            "Content-Type": "application/json"
        });
        if (err) {
            res.send(500, err)
        } else {
            res.send(result);
        }
    });
};


exports.createUser = function (req, res) {
    let userData = req.body;
    User.create(userData, function (err) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.send(500, err)
        } else {
            res.send(201)
        }
    });
};


exports.overwrite = function (req, res) {    
    User.update(req.body, req.user.user_id, function (err, result) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.send(500, err)
        } else {
            res.send(200, result)
        }
    });
};


exports.delete = function (req, res) {  
    User.remove(req.user.user_id, function (err) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            res.send(500, err)
        } else {
            res.send(204)
        }
    });
};