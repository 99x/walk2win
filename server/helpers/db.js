const mongoose = require('mongoose');
// const team = require('../models/team');
// const player = require('../models/player');

exports.connectMock = (teamArr, playerArr) => {
  return new Promise((resolve, reject) => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    MongoMemoryServer.create()
      .then((mongoServer) => {
        return mongoose.connect(mongoServer.getUri(), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      })
      .then((client) => {
        const team = client.model('Team');
        const player = client.model('Player');
        let selected = {
          team: '',
          player: '',
        };
        team.insertMany(teamArr).then((teams) => {
          selected.team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          playerArr[0].team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          playerArr[1].team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          playerArr[2].team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          playerArr[3].team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          playerArr[4].team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          playerArr[5].team =
            teams[Math.round(Math.random() * 100) % 3]._id.toString();
          player.insertMany(playerArr).then((players) => {
            selected.player =
              players[Math.round(Math.random() * 100) % 6]._id.toString();
            resolve(selected);
          });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(
        'mongodb+srv://Shakya:0xHHQ07yRcxKslsC@cluster0.y64qs.mongodb.net/shop?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.close = () => {
  mongoose.disconnect();
};
