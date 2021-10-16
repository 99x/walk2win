const request = require('supertest');
const app = require('../app');
const db = require('../helpers/db');
const { leaderboardComparator } = require('../helpers/pointCalculator');

// describe('GET/ Leaderboard Controller', () => {

//     it('Should return players in a specified team', (done) => {
//         request(app).get(`/api/v1/leaderboard/topteams/${topTeamId}`)
//         .then(res => {
//             const [player] = res.body;
//             expect(player).to.be.not.null;
//             done();
//         })
//         .catch((error) => {
//             done(error);
//         });
//     });

//     it('Should return players in descending order by points and steps', (done) => {
//         request(app).get('/api/v1/leaderboard/topplayers')
//             .then(res => {
//                 const [player1, player2, player3, player4, player5, player6] = res.body;
//                 expect(player1.name).to.equal('Player 1');
//                 expect(player2.name).to.equal('Player 5');
//                 expect(player3.name).to.equal('Player 4');
//                 expect(player4.name).to.equal('Player 3');
//                 expect(player5.name).to.equal('Player 6');
//                 expect(player6.name).to.equal('Player 2');
//                 done();
//             })
//             .catch(error => {
//                 done(error);
//             });
//     });

//     it('Should return details of a selected player', (done) => {
//         request(app).get(`/api/v1/leaderboard/topplayers/${playerId}`)
//             .then(res => {
//                 const player = res.body;
//                 expect(player).to.haveOwnProperty('total_steps');
//                 expect(player).to.haveOwnProperty('steps');
//                 expect(player).to.haveOwnProperty('points');
//                 done();
//             })
//             .catch(error => {
//                 done(error);
//             });
//     });

//     it('Should return male players in descending order by top score and steps', (done) => {
//         request(app).get('/api/v1/leaderboard/topmaleplayers')
//             .then(res => {
//                 const [player1, player2, player3] = res.body;
//                 expect(player1.steps).to.equal(12700);
//                 expect(player2.steps).to.equal(12500);
//                 expect(player3.steps).to.equal(10400);
//                 done();
//             })
//             .catch(error => {
//                 done(error);
//             });
//     });

//     it('Should return female players in descending order by top score and steps', (done) => {
//         request(app).get('/api/v1/leaderboard/topfemaleplayers')
//             .then(res => {
//                 const [player1, player2, player3] = res.body;
//                 expect(player1.steps).to.equal(12550);
//                 expect(player2.steps).to.equal(10500);
//                 expect(player3.steps).to.equal(10000);
//                 done();
//             })
//             .catch(error => {
//                 done(error);
//             });
//     });
// });
const teamArr = [
  {
    name: 'Team 1',
    steps: Math.random() * 1000,
    points: Math.random() * 100,
  },
  {
    name: 'Team 2',
    steps: Math.random() * 1000,
    points: Math.random() * 100,
  },
  {
    name: 'Team 3',
    steps: Math.random() * 1000,
    points: Math.random() * 100,
  },
];

const playerArr = [
  {
    gender: 'male',
    points: 100,
    steps: Math.random() * 10000,
    name: 'Player 1',
    gmail: 'm1@gmail.com',
  },
  {
    gender: 'female',
    points: Math.random() * 100,
    steps: Math.random() * 10000,
    name: 'Player 2',
    gmail: 'm2@gmail.com',
  },
  {
    gender: 'female',
    points: Math.random() * 100,
    steps: Math.random() * 10000,
    name: 'Player 3',
    gmail: 'm3@gmail.com',
  },
  {
    gender: 'male',
    points: Math.random() * 100,
    steps: Math.random() * 10000,
    name: 'Player 4',
    gmail: 'm4@gmail.com',
  },
  {
    gender: 'female',
    points: Math.random() * 100,
    steps: Math.random() * 10000,
    name: 'Player 5',
    gmail: 'm5@gmail.com',
  },
  {
    gender: 'male',
    points: Math.random() * 100,
    steps: Math.random() * 10000,
    name: 'Player 6',
    gmail: 'm6@gmail.com',
  },
];
describe('GET/ Leaderboard Controller', () => {
  let selectedTeam;
  let selectedPlayer;

  beforeAll((done) => {
    db.connectMock(teamArr, playerArr)
      .then((selected) => {
        selectedTeam = selected.team;
        selectedPlayer = selected.player;
        done();
      })
      .catch((err) => done(err));
  }, 20000);

  afterAll((done) => {
    db.close();
    done();
  });

  test('Should return teams in descending order with points and steps count', (done) => {
    request(app)
      .get('/api/v1/leaderboard/topteams')
      .then((res) => {
        const result = res.body.map((item) => {
          return { name: item.name, steps: item.steps, points: item.points };
        });
        expect(result).toEqual(teamArr.sort(leaderboardComparator));
        // console.log(result);
        done();
      })
      .catch((err) => done(err));
  });
  test('should return players in descending order by points and steps', (done) => {
    request(app)
      .get('/api/v1/leaderboard/topplayers')
      .then((res) => {
        const result = res.body.map((item) => {
          return {
            name: item.name,
            steps: item.steps,
            points: item.points,
          };
        });
        const originalResult = playerArr.map((player) => {
          return {
            name: player.name,
            steps: player.steps,
            points: player.points,
          };
        });
        expect(result).toEqual(originalResult.sort(leaderboardComparator));
        done();
      })
      .catch((err) => done(err));
  });
});
