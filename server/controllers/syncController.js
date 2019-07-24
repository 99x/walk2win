let Player = require("../models/player");
let pointCalc = require("../helpers/pointCalculator");

module.exports.syncStepsManual = async (req, res) => {
  let playerGmail = req.headers.gmail;
  let player = await Player.findOne({gmail: playerGmail});

  if(!player) {
    return res.json({
      error: true,
      message: "Player is not registered"
    });
  }

  let date = new Date(req.body.stepCounts.date);
  let steps = req.body.stepCounts.steps;
  let points = pointCalc.calculatePoints({
    steps: steps,
    type: player.team ? 'team' : 'solo'
  });

  const opt = {
    upsert: true
  };
  let elem = await Player.findOneAndUpdate({_id: player.id, "total_steps.date": date}, {
    "$set": {
      "total_steps.$.steps": steps,
      "total_steps.$.points": points,
      "total_steps.$.manual": true
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

  if(!player) {
    return res.json({
      error: true,
      message: "Player is not registered"
    });
  }

  let totalSteps = req.body.stepCounts.map((item) => ({
    date: new Date(item.date),
    steps: item.steps,
    points: pointCalc.calculatePoints({
      steps: item.steps,
      type: player.team ? 'team' : 'solo'
    })

  }));

  // Bring existing data to current input
  let currentTotalSteps = player.total_steps;
  for (let node of currentTotalSteps) {
    let el = totalSteps.findIndex((e) => {
      return e.date.getTime() == node.date.getTime()
    });
    if(el == -1) {
      totalSteps.push({
        date: node.date,
        steps: node.steps,
        points: node.points
      });
    }
    else {
      if(node.manual) {
        totalSteps[el].steps = node.steps;
        totalSteps[el].points = node.points;
        totalSteps[el].manual = true;
      }
    }
  }


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
      return res.json({
        error: true,
        message: "Player is not registered"
      });
    }
    res.json({
      total_steps: player.total_steps.sort((a, b) => new Date(b.date) - new Date(a.date)),
      steps: player.steps,
      points: player.points
    });
  });
}
