let marks = require('../constants');

let calculateBonus = (options) => {
    let steps = options.steps;
    let date = options.date;
    let upoints = 0;
    let lpoints = 0;

    let unlimitedBonusDates = marks.unlimitedBonusDates.map((e) => new Date(e));
    let limitedBonusDates = marks.limitedBonusDates.map((e) => new Date(e));

    // calc unlimited bonus
    if(unlimitedBonusDates.find((e) => e.getTime() == date.getTime()) && steps > marks.bonusStepThreshold) {
        upoints = parseInt((steps - marks.bonusStepThreshold) / marks.unlimitedDiv) * marks.unlimitedIncrement; 
    }

    // calc limited bonus
    if(limitedBonusDates.find((e) => e.getTime() == date.getTime()) && steps > marks.bonusStepThreshold) {
        lpoints = Math.min(parseInt((steps - marks.bonusStepThreshold) / marks.limitedDiv) * marks.limitedIncrement, marks.limitedThreshhold); 
    }

    return upoints + lpoints;
};


module.exports = {
    calculateBonus: calculateBonus
};