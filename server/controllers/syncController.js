let Team = require('../models/team');
let Player = require('../models/player');
let SyncRecord = require('../models/syncrecord');
const constants = require('../constants');

module.exports.syncSteps = (req, res) => {   

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

    Player.find({gmail: playerGmail}, async (err, resp) => {
        if(err) throw err;
        if(resp.length > 0) {

            let record = await SyncRecord.find({ player: resp[0].id, timestamp: syncDate });
            if(record.length > 0) {
                res.json({
                    error: true,
                    message: 'You have already synced steps today. Please try again tomorrow.'
                });
                return;
            }


            let points = 0;
            for(let mark of constants.marks) {
                if(mark[0] <= steps) {
                    points = mark[1];
                    break;
                }
            }
            await Player.updateOne({_id: resp[0].id }, { $inc: { steps: steps, points: points }});
            await Team.updateOne({_id: resp[0].team }, { $inc: { steps: steps, points: points }});
            await SyncRecord.create({ timestamp: new Date(syncDate), player: resp[0].id, steps: steps, points: points });

            res.json({
                error: false,
                message: 'Successfully synced steps data.'
            });

        }
        else {
            res.json({
                error: true,
                message: 'Player not found with given gmail'
            });
        }
    });


    
}
