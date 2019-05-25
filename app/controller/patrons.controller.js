const Patron = require('../models/patrons.model.js');


exports.createPatron = function (req, res) {
    Patron.create(req.params.eventId, req.body.patron, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    })
}

exports.listPatrons = function (req, res) {
    Patron.listAll(req.params.eventId, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}
