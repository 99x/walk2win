let Team = require('../models/team');

module.exports.top = (req, res) => {    
    Team.find({}, (error, teams) => {
        res.json(teams.sort((a, b) => b.score - a.score));
    })
}