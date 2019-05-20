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

    console.log(data)
    Event.create(data, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    });
}