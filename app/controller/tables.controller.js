const Table = require('../models/tables.model.js');

exports.createTable = function (req, res) {
    Table.create(req.params.eventId, req.body.table, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    })
}