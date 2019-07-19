let Team = require("../models/team");
let Player = require("../models/player");
let pointCalc = require("../helpers/pointCalculator");

module.exports.syncStepsManual = async (req, res) => {
  let playerGmail = req.headers.gmail;
  let player = await Player.findOne({gmail: playerGmail});
  let date = new Date(req.body.stepCounts.date);
  let steps = req.body.stepCounts.steps;
  let points = pointCalc.calculatePoints({
    steps: steps,
    type: player.team ? 'team' : 'solo'
  });

  console.log(date, points,steps);
  const opt = {
    upsert: true
  };
  let elem = await Player.findOneAndUpdate({_id: player.id, "total_steps.date": date}, {
    "$set": {
      "total_steps.$.steps": steps,
      "total_steps.$.points": points
    }, opt
  });

  if(!elem) {
    await Player.findOneAndUpdate({_id: player.id}, {
      "$push": {
        total_steps: {
          steps: steps,
          points: points,
          date: date
        }
      }
    });
  }

  let sync = {
    sync: false
  };
  if(player.team)
    sync = await pointCalc.calculateTotalsTeam(player.team, player.id);
  else
    sync = await pointCalc.calculateTotalsSolo(player.id);

  res.json(sync);

};

module.exports.syncSteps = async (req, res) => {
  let playerGmail = req.headers.gmail;
  let player = await Player.findOne({gmail: playerGmail});
  let totalSteps = req.body.stepCounts.map((item) => ({
    date: new Date(item.date),
    steps: item.steps,
    points: pointCalc.calculatePoints({
      steps: item.steps,
      type: player.team ? 'team' : 'solo'
    })

  }));

  await Player.updateOne({_id: player.id}, {
    total_steps: totalSteps
  });

  let sync = {
    sync: false
  };
  if(player.team)
    sync = await pointCalc.calculateTotalsTeam(player.team, player.id);
  else
    sync = await pointCalc.calculateTotalsSolo(player.id);

  res.json(sync);

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
    res.json({
      total_steps: player.total_steps.sort((a, b) => new Date(b.date) - new Date(a.date)),
      steps: player.steps,
      points: player.points
    });
  });
}
