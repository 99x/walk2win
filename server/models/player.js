const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playerSchema = new mongoose.Schema({
  name: String,
  steps: Number,
  total_steps: [
    {
      date: Date,
      steps: Number,
      points: Number,
      manual: Boolean
    }
  ],
  points: Number,
  gender: String,
  gmail: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  }
});

module.exports = mongoose.model("Player", playerSchema);
