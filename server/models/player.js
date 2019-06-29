const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerSchema = new mongoose.Schema({
    name: String,
    steps: Number,
    points: Number,
    gender: String,
    gmail: String,
    team: {
        type: Schema.Types.ObjectId, 
        ref: 'Team'
    }
});

module.exports = mongoose.model('Player', playerSchema);