const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playerSchema = new mongoose.Schema({
  name: String,
  steps: Number,
  total_steps: [
    {
      date: Date,
      steps: Number
    }
  ],
  points: Number,
  gender: String,
  googleId: String,
  gmail: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  accessToken: String,
  oldAccessTokens: [],
  refreshToken: String,
  expiry_date: Date
});

module.exports = mongoose.model("Player", playerSchema);
