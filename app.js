// Standard Library imports
const express = require('./config/express.js');
const cors = require('cors');

// Local imports
const db = require('./config/db.js');
const dbBuilder = require('./dbBuilder.js');

// Init express app
const app = express();

// Use CORS
// app.use(cors);

// Port Constant variable
const PORT = parseInt(process.env.PORT);

// Create Database
db.setupDatabase((err) => {
    console.log('Seting Up Connection...')
    if (err) throw err;
})


// Conntect To database
db.connect((err) => {
    console.log('Connecting... to PORT: ' + PORT)
    if (err) { throw err } else {
        app.listen(PORT, () => {
            console.log('Server running on port: ' + PORT);
        });
    }
});

// Create Tables
dbBuilder.buildTables((err) => {
    console.log("Buiilding Tables");
    if (err) { throw err }
});


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// initTables();

// db.connect(function(err){
//     const app = express();
//     if (err){
//         console.log({'Unable to connect to MYSQL database!!!': err});
//         process.exit(1);
//     } else {
//         app.listen(3001 || 4941 ,function() {
//             console.log("listening to port: " + 3001 + " or " + 4943);
//         });
//     }

// });

// let initTables = function () {
//     return new Promise(function (resolve, reject) {
//         buildDb.buildTables();
//         return resolve()
//     });
// };

// let addkeys = function () {
//   return new Promise(function (resolve, reject) {
//      buildDb.addKeys();
//      return resolve();
//   });
// };

// //
// initTables().then(function (result) {
//     "use strict";
//     return addkeys();
// }).then(function () {
//     // return buildDb.dummyData();
// });

//   // buildDb.dummyData();