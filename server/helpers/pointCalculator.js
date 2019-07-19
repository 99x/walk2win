let marks = require('../constants');
let Player = require('../models/player');
let Team = require('../models/team');

let calculatePoints = (options) => {
    let steps = options.steps;
    let type = options.type;
    let points = 0;

    switch(type) {
        case 'team':
            for (mark of marks.teamMarks) {
                if(mark[0] <= steps) {
                    points = mark[1];
                    break;
                }
            }
            break;
        case 'solo':
            for (mark of marks.soloMarks) {
                if(mark[0] <= steps) {
                    points = mark[1];
                    break;
                }
            }
            break;
    }

    return points;
};

let calculateTotalsSolo = async (id) => {
    let player = await Player.findOne({_id: id});
    if(!player) return;
    let totalPoints = player.total_steps.reduce((a, b) => (a + b.points), 0);
    let totalSteps = player.total_steps.reduce((a, b) => (a + b.steps), 0);
    await Player.updateOne({_id: id}, {points: totalPoints, steps: totalSteps});
    return {
        totalPoints: totalPoints,
        totalSteps: totalSteps
    };
}


let calculateTotalsTeam = async (id, myId) => {
    let players = await Player.find({team: id});
    if(!players) return;
    let steps = 0;
    let points = 0;
    let myRes = {};

    for(let player of players) {
        let res = await calculateTotalsSolo(player.id);
        if(player.id == myId) 
            myRes = res;
        points += res.totalPoints;
        steps += res.totalSteps;
    }

    await Team.updateOne({_id: id}, {steps: steps, points: points});
    return myRes;
}

module.exports = {
    calculatePoints: calculatePoints,
    calculateTotalsSolo: calculateTotalsSolo,
    calculateTotalsTeam: calculateTotalsTeam
};
