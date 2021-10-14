process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const server = require('../app');
const db = require('../helpers/db');

describe('GET / leader board', () => {
  before((done) => {
    db.connect()
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });
  after((done) => {
    db.close()
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });
  it('topTeams', (done) => {
    request(server)
      .get('/api/v1/leaderboard/topteams')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });
});
