let Team = require('../models/team');
let Player = require('../models/player');

module.exports.topTeams = (req, res) => {    
    Team.find({}, (error, teams) => {
        res.json(teams.sort((a, b) => b.points - a.points));
    })
}

module.exports.topTeamPlayers = (req, res) => {    
    Player.find({team: req.params.teamId}, (error, players) => {
        if(error) {
            res.json(error);
            return;
        }
        res.json(players.sort((a, b) => b.points - a.points));
    })
}

module.exports.topPlayers = (req, res) => {    
    Player.find({team: null}, (error, players) => {
        res.json(players.sort((a, b) => b.points - a.points));
    })
}

module.exports.topMalePlayers = (req, res) => {    
    Player.find({gender: 'male', team: null}, (error, players) => {
        res.json(players.sort((a, b) => b.points - a.points));
    })
}

module.exports.topFemalePlayers = (req, res) => {    
    Player.find({gender: 'female', team: null}, (error, players) => {
        res.json(players.sort((a, b) => b.points - a.points));
    })
}