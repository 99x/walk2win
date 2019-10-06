process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const team = require('../models/team');

describe('GET/ topTeams', () => {
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
        }
        team.insertMany([team1, team2, team3])
        .then((res) => {
            done();
        })
        .catch((error) => {
            done(error);
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
});