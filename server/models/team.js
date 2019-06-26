const mongoose = require('mongoose');

let teamSchema = new mongoose.Schema({
    name: String,
    score: Number
});

module.exports = mongoose.model('Team', teamSchema);