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
            + "email VARCHAR(100) NOT NULL,"
            + "password VARCHAR(255) NOT NULL,"
            + "name VARCHAR(50) NOT NULL,"
            + "createTime INT UNSIGNED NOT NULL,"
            + "updateTime INT NULL,"
            + "PRIMARY KEY (id),"
            + "UNIQUE KEY uniqueEmail (email),"
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

    const buildTablesTable = () => {
        const sql = ` CREATE TABLE IF NOT EXISTS tablemanor.Tables (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(45) NOT NULL,
                size INT NOT NULL,
                eventId INT UNSIGNED NOT NULL,
                PRIMARY KEY (id),
                INDEX eventId_idx (eventId ASC) VISIBLE,
                UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
                CONSTRAINT eventId
                FOREIGN KEY (eventId)
                REFERENCES tablemanor.Events (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE);`
        db.get().query(sql, (err) => {
            if (err) {
                return done(err);
            }
        });
    }

    const buildPatronTable = () => {
        const sql = `CREATE TABLE IF NOT EXISTS tablemanor.Patron(
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(50) NOT NULL,
            middleName VARCHAR(50) NULL,
            lastName VARCHAR(50) NULL,
            age INT NULL,
            email VARCHAR(100) NULL,
            contactable BOOLEAN,
            eventId INT UNSIGNED NOT NULL,
            gender ENUM('M','F'),
            PRIMARY KEY(id),
            UNIQUE KEY uniqueEmail (email),
            INDEX event_id_idx (eventId ASC) VISIBLE,
            UNIQUE INDEX id_UNIQUE(id ASC) VISIBLE,
            CONSTRAINT event_id
              FOREIGN KEY(eventId)
              REFERENCES tablemanor.Events(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE);`

        db.get().query(sql, (err) => {
            if (err) {
                return done(err);
            }
        });
    }

    const buildPlacementTable = () => {
        const sql = `CREATE TABLE IF NOT EXISTS tablemanor.Placement (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NULL,
            patronId INT UNSIGNED NOT NULL,
            tableId INT UNSIGNED NOT NULL,
            PRIMARY KEY (id),
            INDEX patronId_idx (patronId ASC) VISIBLE,
            INDEX tableId_idx (tableId ASC) INVISIBLE,
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
            CONSTRAINT patronId
              FOREIGN KEY (patronId)
              REFERENCES tablemanor.Patron (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION,
            CONSTRAINT tableId
              FOREIGN KEY (tableId)
              REFERENCES tablemanor.Tables (id)
              ON DELETE CASCADE
              ON UPDATE CASCADE);`

        db.get().query(sql, (err) => {
            if (err) return done(err);
        })
    }

    setUniqueKeyChecks();
    setForeignKeyChecks();
    setSQLMode();
    buildUserTable();
    buildEventsTable();
    buildTablesTable();
    buildPatronTable();
    buildPlacementTable();
    return done();
};