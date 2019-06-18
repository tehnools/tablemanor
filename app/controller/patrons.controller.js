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

exports.selectPatron = function (req, res) {
    Patron.select(req.params.eventId, req.params.patronId, (err, result) => {
        console.log(result)
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}


exports.updatePatron = function (req, res) {
    Patron.update(req.params.eventId, req.params.patronId, req.body.patron, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}

exports.deletePatron = function (req, res) {
    Patron.delete(req.params.eventId, req.params.patronId, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send()
        }
    })
}