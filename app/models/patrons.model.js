const db = require('../../config/db.js');

const errorBadRequestGender = { code: 400, message: "Bad Request - Your request does not fit the requirement 'M' or 'F'" }
const errorBadRequestFirstName = { code: 400, message: "Bad Request - Missing parameters Firstname" }
const errorBadRequestContactable = { code: 400, message: "Bad Request - Missing parameters Email when person is Contactble" }