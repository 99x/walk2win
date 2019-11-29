process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const team = require('../models/team');
const player = require('../models/player');

describe('GET/ Leaderboard Controller', () => {
    let topTeamId;
    let playerId;
    before((done) => {
        const team1 = {
            name: 'Team 1',
            steps: 10000,
            points: 75
        };
        const team2 = {
            name: 'Team 2',
            steps: 12500,
            points: 100
        };
        const team3 = {
            name: 'Team 3',
            steps: 11000,
            points: 75
        };
        const player1 = { 
            gender : 'male',
            points : 100,
            steps : 12700,
            name : 'Player 1',
            gmail : "m1@gmail.com"
        }
        const player2 = { 
            gender : 'female',
            points : 75,
            steps : 10000,
            name : 'Player 2',
            gmail : "m2@gmail.com"
        }
        const player3 = { 
            gender : 'female',
            points : 75,
            steps : 10500,
            name : 'Player 3',
            gmail : "m3@gmail.com"
        }
        const player4 = { 
            gender : 'male',
            points : 75,
            steps : 12500,
            name : 'Player 4',
            gmail : "m4@gmail.com"
        }
        const player5 = { 
            gender : 'female',
            points : 100,
            steps : 12550,
            name : 'Player 5',
            gmail : "m4@gmail.com"
        }
        const player6 = { 
            gender : 'male',
            points : 75,
            steps : 10400,
            name : 'Player 6',
            gmail : "m4@gmail.com"
        }
        team.insertMany([team1, team2, team3])
        .then((result) => {
            const [a, topTeam,] = result;
            topTeamId = topTeam._id;
            player1.team = topTeamId;
            player2.team = topTeamId;
            player3.team = topTeamId;
            player4.team = topTeamId;
            player.insertMany([player1, player2, player3, player4, player5, player6])
            .then((res) => {
                playerId = res[0]._id;
                done();
            });
        });       
    });

    it('Should return teams in descending order with points and steps count', (done) => {
        request(app).get('/api/v1/leaderboard/topteams')
            .then((res) => {
                const [topTeam1, topTeam2, topTeam3] = res.body;
                expect(topTeam1.name).to.equal('Team 2');
                expect(topTeam2.name).to.equal('Team 3');
                expect(topTeam3.name).to.equal('Team 1');
                done();
            })
            .catch((error) => {
                done(error);
            });            
    });

    it('Should return players in a specified team', (done) => {
        request(app).get(`/api/v1/leaderboard/topteams/${topTeamId}`)
        .then(res => {
            const [player] = res.body;
            expect(player).to.be.not.null;
            done();
        })
        .catch((error) => {
            done(error);
        });
    });

    it('Should return players in descending order by points and steps', (done) => {
        request(app).get('/api/v1/leaderboard/topplayers')
            .then(res => {
                const [player1, player2, player3, player4, player5, player6] = res.body;
                expect(player1.name).to.equal('Player 1');
                expect(player2.name).to.equal('Player 5');
                expect(player3.name).to.equal('Player 4');
                expect(player4.name).to.equal('Player 3');
                expect(player5.name).to.equal('Player 6');
                expect(player6.name).to.equal('Player 2');
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it('Should return details of a selected player', (done) => {
        request(app).get(`/api/v1/leaderboard/topplayers/${playerId}`)
            .then(res => {
                const player = res.body;
                expect(player).to.haveOwnProperty('total_steps');
                expect(player).to.haveOwnProperty('steps');
                expect(player).to.haveOwnProperty('points');
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it('Should return male players in descending order by top score and steps', (done) => {
        request(app).get('/api/v1/leaderboard/topmaleplayers')
            .then(res => {
                const [player1, player2, player3] = res.body;
                expect(player1.steps).to.equal(12700);
                expect(player2.steps).to.equal(12500);
                expect(player3.steps).to.equal(10400);
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it('Should return female players in descending order by top score and steps', (done) => {
        request(app).get('/api/v1/leaderboard/topfemaleplayers')
            .then(res => {
                const [player1, player2, player3] = res.body;
                expect(player1.steps).to.equal(12550);
                expect(player2.steps).to.equal(10500);
                expect(player3.steps).to.equal(10000);
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});

