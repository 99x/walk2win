let Team = require('../models/team');
let Player = require('../models/player');
let leaderboardComparator = require('../helpers/pointCalculator').leaderboardComparator;

module.exports.topTeams = (req, res) => {    
    Team.find({}, (error, teams) => {
        res.json(teams.sort(leaderboardComparator));
    })
}

module.exports.topTeamPlayers = (req, res) => {    
    Player.find({team: req.params.teamId}, (error, players) => {
        if(error) {
            res.json(error);
            return;
        }
        res.json(players.sort(leaderboardComparator).map( e => ({
           
            id: e.id,
            name: e.name,
            steps: e.steps,
            points: e.points 
            
        })));
    })
}

module.exports.topPlayers = (req, res) => {    
    Player.find({}, (error, players) => {
        res.json(players.sort(leaderboardComparator).map( e => ({
           
            id: e.id,
            name: e.name,
            steps: e.steps,
            points: e.points 
            
        })));
    })
}

module.exports.topPlayersData = (req, res) => {    
    Player.findOne({_id: req.params.playerId}, (error, player) => {
        if(error) {
            res.json(error);
            return;
        }
        res.json({
            total_steps: player.total_steps.sort((a, b) => new Date(b.date) - new Date(a.date)),
            steps: player.steps,
            points: player.points
        });
    })
}

module.exports.topMalePlayers = (req, res) => {    
    Player.find({gender: 'male'}, (error, players) => {
        res.json(players.sort(leaderboardComparator).map( e => ({
           
            id: e.id,
            name: e.name,
            steps: e.steps,
            points: e.points 
            
        })));
    })
}

module.exports.topFemalePlayers = (req, res) => {    
    Player.find({gender: 'female'}, (error, players) => {
        res.json(players.sort(leaderboardComparator).map( e => ({
           
            id: e.id,
            name: e.name,
            steps: e.steps,
            points: e.points 
            
        })));
    })
}