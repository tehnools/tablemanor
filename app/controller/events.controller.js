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
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    });
}