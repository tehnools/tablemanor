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






// -- -----------------------------------------------------
// -- Table tablemanor.Events
// -- -----------------------------------------------------
// CREATE TABLE IF NOT EXISTS tablemanor.Events (
//   event_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   name VARCHAR(45) NOT NULL,
//   createTime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
//   userId INT NOT NULL,
//   PRIMARY KEY (event_id),
//   INDEX userId_idx (userId ASC) VISIBLE,
//   UNIQUE INDEX event_id_UNIQUE (event_id ASC) VISIBLE,
//   CONSTRAINT userId
//     FOREIGN KEY (userId)
//     REFERENCES tablemanor.user (userId)
//     ON DELETE CASCADE
//     ON UPDATE CASCADE)
// ENGINE = InnoDB
// DEFAULT CHARACTER SET = ascii;


// -- -----------------------------------------------------
// -- Table tablemanor.Tables
// -- -----------------------------------------------------
// CREATE TABLE IF NOT EXISTS tablemanor.Tables (
//   table_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   name VARCHAR(45) NOT NULL,
//   size INT NOT NULL,
//   event_id INT NOT NULL,
//   PRIMARY KEY (table_id),
//   INDEX event_id_idx (event_id ASC) VISIBLE,
//   UNIQUE INDEX table_id_UNIQUE (table_id ASC) VISIBLE,
//   CONSTRAINT event_id
//     FOREIGN KEY (event_id)
//     REFERENCES tablemanor.Events (event_id)
//     ON DELETE CASCADE
//     ON UPDATE CASCADE);


// -- -----------------------------------------------------
// -- Table tablemanor.Patron
// -- -----------------------------------------------------
// CREATE TABLE IF NOT EXISTS tablemanor.Patron (
//   patron_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   first_name VARCHAR(255) NOT NULL,
//   middle_name VARCHAR(255) NULL,
//   last_name VARCHAR(255) NULL,
//   age INT NULL,
//   event_id INT NOT NULL,
//   PRIMARY KEY (patron_id),
//   INDEX event_id_idx (event_id ASC) VISIBLE,
//   UNIQUE INDEX patron_id_UNIQUE (patron_id ASC) VISIBLE,
//   CONSTRAINT event_id
//     FOREIGN KEY (event_id)
//     REFERENCES tablemanor.Events (event_id)
//     ON DELETE CASCADE
//     ON UPDATE CASCADE);


// -- -----------------------------------------------------
// -- Table tablemanor.Position
// -- -----------------------------------------------------
// CREATE TABLE IF NOT EXISTS tablemanor.Position (
//   position_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   position_number INT UNSIGNED NOT NULL,
//   name VARCHAR(255) NULL,
//   patron_id INT NOT NULL,
//   table_id INT NOT NULL,
//   PRIMARY KEY (position_id),
//   INDEX patron_id_idx (patron_id ASC) VISIBLE,
//   INDEX table_id_idx (table_id ASC) VISIBLE,
//   UNIQUE INDEX position_id_UNIQUE (position_id ASC) VISIBLE,
//   CONSTRAINT patron_id
//     FOREIGN KEY (patron_id)
//     REFERENCES tablemanor.Patron (patron_id)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION,
//   CONSTRAINT table_id
//     FOREIGN KEY (table_id)
//     REFERENCES tablemanor.Tables (table_id)
//     ON DELETE CASCADE
//     ON UPDATE CASCADE);


// SET SQL_MODE=@OLD_SQL_MODE;
// SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
// SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
