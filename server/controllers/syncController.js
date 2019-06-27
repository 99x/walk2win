let Team = require('../models/team');
let Player = require('../models/player');
let SyncRecord = require('../models/syncrecord');

module.exports.syncSteps = (req, res) => {   
    console.log(req.body); 
    let syncDate = req.body.syncDate;
    let steps = req.body.steps;
    let playerGmail = req.body.playerGmail;

    if(!syncDate || !steps || !playerGmail) {
        res.json({
            error: true,
            message: 'Please set required params'
        });
        return;
    }

    SyncRecord.create({

    });


    
}
