const mongoose = require('mongoose');

exports.connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mock = new Mockgoose(mongoose);
      mock
        .prepareStorage()
        .then(() => {
          mongoose.connect(
            'mongodb+srv://Shakya:0xHHQ07yRcxKslsC@cluster0.y64qs.mongodb.net/shop?retryWrites=true&w=majority',
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            }
          );
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    } else {
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
    }
  });
};

exports.close = () => {
  return mongoose.disconnect();
};
