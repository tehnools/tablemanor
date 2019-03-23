const express = require('express'),
    db = require('./config/db.js'),
    cors = require('cors'),
    dbBuilder = require('./dbBuilder.js');


const app = express();
// app.use(cors);

const PORT = parseInt(process.env.PORT);

db.setupDatabase((err) => {
    console.log('Seting Up Connection...')
    if (err) throw err;
})

db.connect((err) => {
    console.log('Connecting... to PORT: ' + PORT)
    if (err) { throw err } else {
        app.listen(PORT, () => {
            console.log('Server running on port: ' + PORT);
        });
    }
});


const initTables = () => {
    return new Promise((resolve) => {
        dbBuilder.buildTables();
    });
}

app.get('/',(req, res) =>{
    res.send('Hello World!')
});

initTables().then(()=>{
    console.log('Tables Completed');
})

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