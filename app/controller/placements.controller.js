const Placements = require('../models/placements.model.js');

exports.createPlacement = function (req, res) {
    let data = req.body.placement;
    Placements.create(data, patronId, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send()
        }
    })
}

exports.selectPlacement = function (req, res) {
    const tableId = req.body.placement.tableId;
    const patronId = req.body.placement.patronId;

    Placements.delete(tableId, patronId, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send(result)
        }
    })
}

exports.deletePlacement = function (req, res) {
    Placements.delete(req.body.placement.patronId, req.params.placementId, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send()
        }
    })
}