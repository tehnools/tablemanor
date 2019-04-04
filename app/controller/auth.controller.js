const Auth = require('../models/auth.model');

exports.login = function(req,res) {
    Auth.login(function(result) {
        console.log('user authorization');
        if (result['500']){res.status(500); res.json(result)}
        res.status(201);
        res.json(result);
    });
};