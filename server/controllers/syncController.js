let Team = require("../models/team");
let Player = require("../models/player");
let SyncRecord = require("../models/syncrecord");
const constants = require("../constants");
let syncSteps = require("../syncSteps");
let pointCalc = require("../helpers/pointCalculator");

module.exports.syncSteps = (req, res) => {
  let playerGmail = req.headers.gmail;
  console.log("In sync header");
  //console.log(req.headers.authorization)

  // if(!syncDate || !steps || !playerGmail) {
  //     res.json({
  //         error: true,
  //         message: 'Please set required params'
  //     });
  //     return;
  // }

  Player.find({ gmail: playerGmail }, async (err, resp) => {
    if (err) throw err;
    if (resp.length > 0) {
      const playerId = resp[0]._id;
      const todaySteps = await syncSteps(
        resp[0].accessToken,
        resp[0].refreshToken
      );
      console.log(todaySteps);

      const d = new Date();
      d.setHours(0, 0, 0, 0);

      Player.findOne({ gmail: playerGmail, "total_steps.date": d }, function(
        err,
        doc
      ) {
        if (err) next(err);

        if (!doc) {
          console.log(typeof resp[0].total_steps);
          //   resp[0].total_steps.push({ date: d, steps: todaySteps });
          //   resp.save();
        }

        // Player.findOneAndUpdate(
        //   { gmail: playerGmail, "total_steps.date": new Date() },
        //   { $set: { total_steps: { steps: todaySteps } } },
        //   { upsert: true },
        //   function(err, doc) {
        //     if (err) return res.send(500, { error: err });
        //     return res.json({
        //       error: false,
        //       status: true,
        //       message: `Steps synced ${todaySteps}`
        //     });
        //   }
        // );

        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month =
          currentDate.getMonth().toString().length === 1
            ? `0${currentDate.getMonth() + 1}`
            : currentDate.getMonth() + 1;
        const date = currentDate.getDate();

        const utcDate = `${year}-${month}-${date}T00:00:00.000Z`;
        //dd.setHours(0, 0, 0, 0);
        console.log("Here", utcDate);

        let todayScore = pointCalc.calculatePoints(todaySteps);

        Player.findOneAndUpdate(
          { gmail: playerGmail, "total_steps.date": new Date(utcDate) },
          {
            $set: {
              "total_steps.$.steps": todaySteps,
              "total_steps.$.points": todayScore,
              "total_steps.$.date": new Date(utcDate)
            }
          },
          { upsert: true },
          function(err, doc) {
            if (err) {
              Player.findOneAndUpdate(
                { gmail: playerGmail },
                {
                  $push: {
                    total_steps: { date: utcDate, steps: todaySteps, points: todayScore }
                  }
                },
                (errNewSteps,
                newSteps => {
                  if (errNewSteps) next(errNewSteps);

                  pointCalc.calculateTotals(playerId);

                  return res.json({
                    error: false,
                    status: true,
                    message: `Steps synced ${todaySteps}`
                  });
                })
              );
            }

            pointCalc.calculateTotals(playerId);

            return res.json({
              error: false,
              status: true,
              message: `Steps synced ${todaySteps}`
            });
          }
        );
      });

      // let record = await SyncRecord.find({ player: resp[0].id, timestamp: syncDate });
      // if(record.length > 0) {
      //     res.json({
      //         error: true,
      //         message: 'You have already synced steps today. Please try again tomorrow.'
      //     });
      //     return;
      // }

      // let points = 0;
      // for(let mark of constants.marks) {
      //     if(mark[0] <= steps) {
      //         points = mark[1];
      //         break;
      //     }
      // }
      // await Player.updateOne({_id: resp[0].id }, { $inc: { steps: steps, points: points }});
      // await Team.updateOne({_id: resp[0].team }, { $inc: { steps: steps, points: points }});
      // await SyncRecord.create({ timestamp: new Date(syncDate), player: resp[0].id, steps: steps, points: points });

      // res.json({
      //     error: false,
      //     message: 'Successfully synced steps data.'
      // });
    } else {
      res.json({
        error: true,
        message: "Player not found with given gmail"
      });
    }
  });
};

module.exports.authCb = function(req, res) {
  res.redirect("/");
};


module.exports.playerSync = function(req, res) {
  let playerGmail = req.headers.gmail;
  if(!playerGmail) {
    res.json({
      error: true,
      message: 'gmail is not set'
    });
    return;
  }
  Player.findOne({gmail: playerGmail}, (error, player) => {
    if(error) {
      res.json(error);
      return;
    }
    if(!player) {
      res.json({
        error: true,
        message: 'player not found'
      });
      return;
    }
    res.json(player.total_steps.sort((a, b) => new Date(b.date) - new Date(a.date)));
  });
}
