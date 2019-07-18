let marks = require('../constants');
let Player = require('../models/player');

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

let calculateTotals = (id) => {
    Player.findById(id, (error, player) => {
        if(error) return;
        let totalPoints = player.total_steps.reduce((a, b) => (a + b.points), 0);
        let totalSteps = player.total_steps.reduce((a, b) => (a + b.steps), 0);
        Player.updateOne({_id: id}, {points: totalPoints, steps: totalSteps}, () => {});
    });
}

/* 
console.log(calculatePoints({
    steps: 22000,
    type: 'solo'
})); */

module.exports = {
    calculatePoints: calculatePoints,
    calculateTotals: calculateTotals
};
