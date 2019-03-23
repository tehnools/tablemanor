const db = require('../../config/db.js');

exports.listAll = function(done){
    db.get().query("SELECT * FROM Users", function (err, rows) {
        console.log('user model');
        if (err) {
            return done({"500": "SERVER FAILED REQUEST"})
        }
        return done(rows);
    });
};