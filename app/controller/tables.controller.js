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

exports.listTables = function (req, res) {
    Table.listAll(req.params.eventId, (err, result) => {
        console.log(result)
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}

exports.selectTable = function (req, res) {
    Table.select(req.params.eventId, req.params.tableId, (err, result) => {
        console.log(result)
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}

exports.deleteTable = function (req, res) {
    Table.delete(req.params.eventId, req.params.tableId, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send()
        }
    })
}