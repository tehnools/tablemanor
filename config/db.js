const mysql = require('mysql');

exports.setupDatabase = function (done) {
    let con = mysql.createConnection({
        host: process.env.SERVER_MYSQL_HOST,
        user: process.env.SERVER_MYSQL_USERNAME,
        password: process.env.SERVER_MYSQL_PASSWORD,
        port: parseInt(process.env.SERVER_MYSQL_PORT),
        database: 'tablemanor',
        multipleStatements: true
    });
    con.connect();
    console.log(process.env.SERVER_MYSQL_HOST);
    const CREATEDB = "CREATE DATABASE IF NOT EXISTS tablemanor";
    con.query(CREATEDB, (err) => {
        if (err) { throw err; process.exit(1); }
    });
    con.end();
    return done();
};

const state = {
    pool: null
};

exports.connect = function (done) {
    state.pool = mysql.createPool({
        host: process.env.HOST_NAME || 'localhost',
        user: process.env.SERVER_MYSQL_USERNAME,
        password: process.env.SERVER_MYSQL_PASSWORD,
        port: process.env.SERVER_MYSQL_PORT || '3306',
        database: 'tablemanor'
    });
    done();
};

exports.get = function () {
    return state.pool;
};
