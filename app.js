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
    if (err) { 
        throw err
     } else {
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
