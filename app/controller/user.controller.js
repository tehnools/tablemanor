const User = require('../models/users.model');

exports.readAll = function(req,res) {
    User.listAll(function(result) {
        console.log('user controler');
        if (result['500']){res.status(500); res.json(result)}
        res.status(201);
        res.json(result);
    });
};