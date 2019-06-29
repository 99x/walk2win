const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let syncRecordSchema = new mongoose.Schema({
    timestamp: Date,
    steps: Number,
    points: Number,
    player: {
        type: Schema.Types.ObjectId, 
        ref: 'Player'
    }
});

module.exports = mongoose.model('SyncRecord', syncRecordSchema);