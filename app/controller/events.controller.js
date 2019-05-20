const Event = require('../models/events.model.js');


exports.createEvent = (req, res) => {
    let data = req.body;

    console.log(data)
    Event.create(data, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    });
}