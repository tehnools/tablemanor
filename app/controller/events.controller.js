const Event = require('../models/events.model.js');


exports.listEvents = function (req, res) {
    Event.listAll(req.user.id, (err, result)=>{
        console.log(result)
        if (err){
            res.status(500).send(err);
        } else{
            res.status(200).send(result);
        }
    })
}

exports.selectEvent = function (req, res) {
    Event.select(req.params.id, (err, result)=>{
        console.log(result)
        if (err){
            res.status(500).send(err);
        } else{
            res.status(200).send(result);
        }
    })
}

exports.createEvent = function (req, res) {
    Event.create(req.user.id, req.body.event, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    });
}


exports.updateEvent = function (req, res) {
    Event.update(req.body.event, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send();
        }
    });
}

exports.deleteEvent = function(req, res){
    Event.delete(req.params.id, (err)=>{
        if (err){
            res.status(500).send(err);
        } else {
            res.status(204).send()
        }
    })
}