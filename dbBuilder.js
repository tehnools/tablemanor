// Local Imports
const db = require('./config/db.js');

exports.buildTables = (done) => {

    // Set Unique Checks to false
    const setUniqueKeyChecks = () => {
        let sql = "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;";
        db.get().query(sql, (err) => {
            if (err) {
                return done(err);
            }
        });
    }

    // Set Foreign Key Checks to false
    const setForeignKeyChecks = () => {
        let sql = "SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;";
        db.get().query(sql, (err, rows) => {
            if (err) {
                return done(err);
            }
        });
    }

    // Set SQL mode prevent zero in date and division by 0
    const setSQLMode = () => {
        let sql = "SET @OLD_SQL_MODE=@@SQL_MODE, "
            + "SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,"
            + "NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,"
            + "NO_ENGINE_SUBSTITUTION';"

        db.get().query(sql, (err) => {
            if (err) {
                return done(err);
            }
        });
    }

    // -- -----------------------------------------------------
    // -- Table tablemanor.users
    // -- -----------------------------------------------------
    //TODO please add check for email unique
    const buildUserTable = () => {
        let sql = "CREATE TABLE IF NOT EXISTS tablemanor.users"
            + "(id INT UNSIGNED NOT NULL AUTO_INCREMENT,"
            + "email VARCHAR(255) NOT NULL,"
            + "password VARCHAR(255) NOT NULL,"
            + "name VARCHAR(45) NOT NULL,"
            + "createTime INT UNSIGNED NOT NULL,"
            + "updateTime INT NULL,"
            + "PRIMARY KEY (id),"
            + "UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)";

        db.get().query(sql, (err) => {
            if (err) {
                return done(err);
            }
        });
    }

    const buildEventsTable = () => {
        const sql = "CREATE TABLE IF NOT EXISTS tablemanor.events ( "
            + "id INT UNSIGNED NOT NULL AUTO_INCREMENT, "
            + "name VARCHAR(45) NOT NULL,"
            + "type VARCHAR(45),"
            + "location VARCHAR(45),"
            + "startTime VARCHAR(255) NOT NULL,"
            + "endTime VARCHAR(255) NOT NULL,"
            + "createTime INT UNSIGNED NOT NULL, "
            + "updateTime INT UNSIGNED NULL, "
            + "userId INT UNSIGNED NOT NULL, "
            + "PRIMARY KEY (id),"
            + "INDEX userId_idx (userId ASC) VISIBLE, "
            + "UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE, "
            + "CONSTRAINT userId "
            + "FOREIGN KEY (userId) "
            + "REFERENCES tablemanor.users (id) "
            + "ON DELETE CASCADE "
            + "ON UPDATE CASCADE) "
            + "ENGINE = InnoDB "
            + "DEFAULT CHARACTER SET = ascii;";
        db.get().query(sql, (err) => {
            if (err) {
                return done(err);
            }
        });
    }

    const buildEventsMetaTable = () => {
        const sql = ``;
    }

    const buildTablesTable = () => {
        const sql = `
        CREATE TABLE IF NOT EXISTS tablemanor.Tables (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        size INT NOT NULL,
        eventId INT NOT NULL,
        PRIMARY KEY (id),
        INDEX eventId_idx (eventId ASC) VISIBLE,
        UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
        CONSTRAINT eventId
        FOREIGN KEY (eventId)
        REFERENCES tablemanor.Events (eventId)
        ON DELETE CASCADE
        ON UPDATE CASCADE);
        `;
    }

    setUniqueKeyChecks();
    setForeignKeyChecks();
    setSQLMode();
    buildUserTable();
    buildEventsTable();
    return done();
};