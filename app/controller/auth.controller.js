const jwt = require('express-jwt')

exports.login = function (req, res) {
    jwt({secret: process.env.PUBLIC_KEY})
    console.log(req.user)
    if (!req.user){
        res.send(401, {message: "Email or password is incorrect"})
    }
    res.send(201, "Login Sucessful");
};