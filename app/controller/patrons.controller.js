const Patron = require('../models/patrons.model.js');


exports.listPatrons = function (req, res) {
    Patron.listAll(req.params.eventId, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}
