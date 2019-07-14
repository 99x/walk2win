let marks = require('../constants');

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


/* 
console.log(calculatePoints({
    steps: 22000,
    type: 'solo'
})); */

module.exports.calculatePoints = calculatePoints;